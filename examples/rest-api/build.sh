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

# Create temporary AWS credentials file
echo "🔑 Creating temporary AWS credentials file..."
TEMP_CREDS_FILE=$(mktemp)

# Export current AWS credentials to temporary file
eval $(aws configure export-credentials --format env)
cat > "$TEMP_CREDS_FILE" << EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
aws_session_token = $AWS_SESSION_TOKEN
region = us-west-2
EOF

# Build Docker image using secrets (no more build args!)
echo "🐳 Building Docker image: $IMAGE_NAME"
docker build \
  --secret id=npmrc,src=$HOME/.npmrc \
  --secret id=aws-credentials,src="$TEMP_CREDS_FILE" \
  -t $IMAGE_NAME \
  .

# Clean up temporary credentials file
echo "🧹 Cleaning up temporary credentials file..."
rm -f "$TEMP_CREDS_FILE"

echo "✅ Build complete! Image: $IMAGE_NAME"
echo "🚀 Run with: docker run -p 3000:3000 $IMAGE_NAME" 