# REST API Example - Decoupled Architecture

This example demonstrates a production-ready REST API with clean separation between production and testing concerns.

## Architecture Overview

### 🏗️ **Decoupled Design**
- **Production**: Clean Alpine container + External MongoDB 8.0
- **Testing**: In-memory MockMongoProvider for fast unit tests
- **Development**: Docker Compose with real MongoDB for integration testing

### 📦 **Container Strategy**
```
Production Container (Alpine)
├── No test dependencies
├── Connects to external MongoDB
└── Optimized for size & security

Test Environment
├── MockMongoProvider (in-memory)
├── Fast unit tests
└── No external dependencies
```

## Quick Start

### 🚀 **Development with Docker Compose**
```bash
# Start full stack (API + MongoDB 8.0)
npm run docker:up

# View logs
npm run docker:logs

# Stop services
npm run docker:down
```

### 🧪 **Testing**
```bash
# Unit tests (MockMongoDB - fast)
npm test

# Integration tests (Docker MongoDB)
npm run test:integration
```

### 🏭 **Production Build**
```bash
# Build production image
./build.sh production-api

# Run with external MongoDB
docker run -p 3000:3000 \
  -e MONGODB_URL=mongodb://your-mongo:27017/saga_app \
  production-api
```

## Features

### ✅ **MongoDB 8.0 Support**
- Latest driver (`mongodb@^6.10.0`)
- Modern connection options
- Compression (snappy, zlib, zstd)
- Health checks with ping

### ✅ **Environment-Based Providers**
```typescript
// Production: Real MongoDB
if (!isTestEnvironment) {
  container.bind<IMongoConnMgr>('IMongoConnMgr')
    .toDynamicValue(() => new MongoProvider(connectionString));
}

// Tests: In-memory MockMongo
if (isTestEnvironment) {
  container.bind<IMongoConnMgr>('IMongoConnMgr')
    .toDynamicValue(() => new MockMongoProvider());
}
```

### ✅ **Health Monitoring**
```bash
curl http://localhost:3000/health
```
```json
{
  "status": "ok",
  "checks": {
    "database": { "status": "ok", "instance": "ProductionMongoDB" },
    "memory": { "usage": { "rss": 45, "heapUsed": 23 } }
  }
}
```

### ✅ **Security Best Practices**
- Non-root user in container
- Secure credential handling (no build args)
- Health checks for reliability
- Minimal Alpine base image

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check with DB status |
| `/saga-soa/hello/test-route` | GET | Simple hello endpoint |
| `/saga-soa/hello-mongo/test-write` | POST | Write to MongoDB |
| `/saga-soa/hello-mongo/test-read` | GET | Read from MongoDB |

## Configuration

### Environment Variables
```bash
NODE_ENV=production          # Switches to real MongoDB
MONGODB_URL=mongodb://...     # MongoDB connection string
PORT=3000                    # Server port
```

### Docker Compose Services
```yaml
services:
  rest-api:
    build: .
    environment:
      - MONGODB_URL=mongodb://mongodb:27017/saga_app
  
  mongodb:
    image: mongo:8.0
    environment:
      - MONGO_INITDB_DATABASE=saga_app
```

## Development

### File Structure
```
src/
├── providers/
│   └── mongo-provider.ts        # Production MongoDB provider
├── __tests__/
│   ├── test-container.ts        # Test-only container config
│   └── integration.test.ts      # Integration tests
├── sectors/
│   ├── hello-mongo.ts           # MongoDB endpoints
│   └── health.ts               # Health check endpoint
└── inversify.config.ts          # Environment-based DI
```

### Key Benefits
- 🚀 **Fast tests**: In-memory database
- 🔒 **Secure**: No test deps in production
- 📦 **Small images**: Alpine + minimal deps
- 🎯 **Realistic**: Integration tests use real MongoDB 8.0
- 🔧 **Flexible**: Easy to switch databases

## MongoDB 8.0 Features Used

- **Schema Validation**: JSON Schema for collections
- **Compression**: Multi-algorithm support
- **Performance**: Optimized connection pooling
- **Health Checks**: Built-in ping commands
- **Modern Syntax**: Latest aggregation operators

This architecture follows container best practices and provides a solid foundation for production REST APIs with proper testing strategies. 