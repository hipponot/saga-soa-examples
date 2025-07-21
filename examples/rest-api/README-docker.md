# Docker Build Guide

## Prerequisites

1. **AWS SSO configured and logged in:**
   ```bash
   aws sso login
   ```

2. **Docker with BuildKit enabled** (for secrets support)

## Quick Build & Run

### Option 1: Use the build script (Recommended)
```bash
# Build with default name
./build.sh

# Build with custom name  
./build.sh my-rest-api

# Run the container
docker run -p 3000:3000 rest-api
```

### Option 2: Manual build
```bash
# Export AWS credentials from current SSO session
eval $(aws configure export-credentials --format env)

# Build with secrets
docker build \
  --build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  --build-arg AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
  --secret id=npmrc,src=$HOME/.npmrc \
  -t rest-api \
  .
```

## Troubleshooting

### "AWS SSO session not active"
```bash
aws sso login
```

### "npmrc not found"
Make sure your `~/.npmrc` file exists and contains your private registry configuration.

### "Permission denied"
Make sure the build script is executable:
```bash
chmod +x build.sh
```

## How it Works

- Uses Docker secrets to securely mount your `~/.npmrc` (never stored in image)
- Passes AWS SSO credentials as build arguments (only used during build)
- Automatically handles temporary AWS SSO tokens
- Works with any AWS SSO profile configuration 