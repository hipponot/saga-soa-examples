# syntax=docker/dockerfile:1

# Build stage  
FROM node:20-alpine AS builder

# Accept AWS credentials as build args
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY  
ARG AWS_SESSION_TOKEN
ARG AWS_REGION=us-west-2

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN
ENV AWS_REGION=$AWS_REGION

RUN apk add --no-cache aws-cli pnpm

# Install pnpm with .npmrc access
RUN --mount=type=secret,id=npmrc,target=/tmp/.npmrc \
    cp /tmp/.npmrc /root/.npmrc && \
    npm install -g pnpm@9.0.0

# Set working directory
WORKDIR /app

# Copy workspace files
COPY package.json ./
COPY tsconfig.docker.json ./tsconfig.json
COPY tsup.config.ts ./
COPY src/ ./src/

# Authenticate with CodeArtifact and install dependencies
RUN --mount=type=secret,id=npmrc,target=/tmp/.npmrc \
    cp /tmp/.npmrc /root/.npmrc && \
    export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain saga --query authorizationToken --output text) && \
    npm config set //saga-531314149529.d.codeartifact.us-west-2.amazonaws.com/npm/saga_js/:_authToken=$CODEARTIFACT_AUTH_TOKEN && \
    pnpm install

# Build the project
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Copy necessary dependencies
COPY --from=builder /app/node_modules ./node_modules

# Expose port (adjust based on your app configuration)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]