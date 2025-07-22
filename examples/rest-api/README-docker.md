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
# Create temporary AWS credentials file
TEMP_CREDS_FILE=$(mktemp)
eval $(aws configure export-credentials --format env)
cat > "$TEMP_CREDS_FILE" << EOF
[default]
aws_access_key_id = $AWS_ACCESS_KEY_ID
aws_secret_access_key = $AWS_SECRET_ACCESS_KEY
aws_session_token = $AWS_SESSION_TOKEN
region = us-west-2
EOF

# Build with secrets (secure approach)
docker build \
  --secret id=npmrc,src=$HOME/.npmrc \
  --secret id=aws-credentials,src="$TEMP_CREDS_FILE" \
  -t rest-api \
  .

# Clean up
rm -f "$TEMP_CREDS_FILE"
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

- **Secure credential handling**: Uses Docker secrets to securely mount AWS credentials (never stored in image layers)
- **No credential exposure**: AWS credentials are passed as temporary mounted files, not build arguments
- **Automatic cleanup**: Temporary credential files are automatically removed after build
- **Zero security warnings**: No credentials stored in Docker history or image layers
- **SSO compatibility**: Works seamlessly with AWS SSO temporary tokens

## Security Features

✅ **No credentials in image layers**  
✅ **No credentials in Docker history**  
✅ **Temporary credential files auto-cleaned**  
✅ **Follows Docker security best practices** 