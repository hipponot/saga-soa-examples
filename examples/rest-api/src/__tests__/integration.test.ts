import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import request from 'supertest';
import { createTestContainer } from './test-container.js';
import { ExpressServer } from '@hipponot/soa-core-api/express-server';
import type { ExpressServerConfig } from '@hipponot/soa-core-api/express-server-schema';
import { loadControllers } from '@hipponot/soa-core-api/utils/loadControllers';
import { RestControllerBase } from '@hipponot/soa-core-api/rest-controller';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { IMongoConnMgr } from '@hipponot/soa-db';

let app: express.Application;
let mongoManager: IMongoConnMgr;

beforeAll(async () => {
  // Use test container with MockMongoProvider
  const container = createTestContainer();

  // ExpressServer binding
  const expressConfig: ExpressServerConfig = {
    configType: 'EXPRESS_SERVER',
    port: 0, // Use ephemeral port for testing
    logLevel: 'warn', // Less verbose for tests
    name: 'Test REST API',
  };
  container.bind<ExpressServerConfig>('ExpressServerConfig').toConstantValue(expressConfig);

  // Dynamically load all sector controllers (match main.ts logic)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const controllers = await loadControllers(
    // Note this is a vitest so we load the TS files - vitest uses esbuild to transpile ts files on the fly for testing
    path.resolve(__dirname, '../sectors/*.ts'),
    RestControllerBase
  );
  console.log('Loaded controllers:', controllers.map(c => c.name));

  // Get MongoDB manager for cleanup
  mongoManager = await container.getAsync<IMongoConnMgr>('IMongoConnMgr');

  // Use ExpressServer from DI, initialize with controllers, and get the app instance
  const expressServer = container.get(ExpressServer);
  await expressServer.init(container, controllers);
  app = expressServer.getApp();
});

afterAll(async () => {
  // Clean up MongoDB connection
  if (mongoManager) {
    await mongoManager.disconnect();
  }
});

describe('REST API Integration', () => {
  it('GET /health - should return healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.checks.database.status).toBe('ok');
  });

  it('GET /saga-soa/hello/test-route', async () => {
    const res = await request(app).get('/saga-soa/hello/test-route');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Hello');
  });

  it('GET /saga-soa/hello-again/test-route', async () => {
    const res = await request(app).get('/saga-soa/hello-again/test-route');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Hello again');
  });

  it('POST /hello-mongo then GET /hello-mongo - should work with in-memory database', async () => {
    // Write test doc
    const postRes = await request(app).post('/saga-soa/hello-mongo/test-write');
    expect(postRes.status).toBe(201);
    expect(postRes.body.ok).toBe(true);

    // Read test doc
    const getRes = await request(app).get('/saga-soa/hello-mongo/test-read');
    expect(getRes.status).toBe(200);
    expect(getRes.body.message).toBe('Hello from Mongo!');
  });
});