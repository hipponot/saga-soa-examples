#!/bin/bash

# Simple Docker build script with AWS SSO support
# Usage: ./build.sh [image-name]

set -e

IMAGE_NAME=${1:-"rest-api"}

echo "🔍 Checking AWS SSO session..."

# Check if AWS SSO session is active
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS SSO session not active. Please run:"
    echo "   aws sso login"
    exit 1
fi

echo "✅ AWS SSO session active"

# Export current AWS credentials
echo "🔑 Exporting AWS credentials..."
eval $(aws configure export-credentials --format env)

# Build Docker image
echo "🐳 Building Docker image: $IMAGE_NAME"
docker build \
  --build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  --build-arg AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
  --secret id=npmrc,src=$HOME/.npmrc \
  -t $IMAGE_NAME \
  .

echo "✅ Build complete! Image: $IMAGE_NAME"
echo "🚀 Run with: docker run -p 3000:3000 $IMAGE_NAME" 