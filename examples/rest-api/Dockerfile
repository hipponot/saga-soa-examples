#syntax=docker/dockerfile:1.7

# Build stage  
FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm@9.0.0

# Set working directory
WORKDIR /app

# Copy the entire context (includes both repos when built from parent)
COPY . .

# Install dependencies 
RUN pnpm install --frozen-lockfile

# Build the project
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

  # Create non-root user for security
  RUN addgroup -g 1001 -S nodejs && \
      adduser -S nextjs -u 1001
  
  # Copy with ownership set immediately - FAST! (Correct paths from builder stage)
  COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
  COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
  COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const options = { host: 'localhost', port: 3000, path: '/health', timeout: 2000 }; const req = http.request(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => process.exit(1)); req.end();"

# Start the application
CMD ["node", "dist/main.js"]
