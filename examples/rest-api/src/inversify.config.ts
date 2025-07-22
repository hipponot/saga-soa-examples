import { Container } from 'inversify';
import type { MongoClient } from 'mongodb';
import { MONGO_CLIENT } from '@hipponot/soa-db';
import type { IMongoConnMgr } from '@hipponot/soa-db';
import { MockMongoProvider } from '@hipponot/soa-db/mocks/mock-mongo-provider';
import { MongoProvider } from './providers/mongo-provider.js';
import type { ILogger, PinoLoggerConfig } from '@hipponot/soa-logger';
import { PinoLogger } from '@hipponot/soa-logger';
import { ExpressServer } from '@hipponot/soa-core-api/express-server';

const container = new Container();

// Docker-friendly logger config - uses stdout by default
const loggerConfig: PinoLoggerConfig = {
  configType: 'PINO_LOGGER',
  level: 'info',
  isExpressContext: true,
  prettyPrint: process.env.NODE_ENV !== 'production',
  // Only use logFile if explicitly set, otherwise stdout (Docker best practice)
  logFile: process.env.LOG_FILE || undefined,
};

container.bind<PinoLoggerConfig>('PinoLoggerConfig').toConstantValue(loggerConfig);

// Bind Logger
container.bind<ILogger>('ILogger').toDynamicValue(() => {
  const config = container.get<PinoLoggerConfig>('PinoLoggerConfig');
  return new PinoLogger(config);
}).inSingletonScope();

// Environment-based MongoDB provider binding
const isTestEnvironment = process.env.NODE_ENV === 'test';
const mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost:27017/saga_app';

if (isTestEnvironment) {
  // Use MockMongoProvider for tests only
  container.bind<IMongoConnMgr>('IMongoConnMgr').toDynamicValue(async () => {
    const provider = new MockMongoProvider('TestMongoDB');
    await provider.connect();
    return provider;
  }).inSingletonScope();
} else {
  // Use real MongoProvider for development/production
  container.bind<IMongoConnMgr>('IMongoConnMgr').toDynamicValue(async () => {
    const provider = new MongoProvider(mongoConnectionString, 'ProductionMongoDB');
    await provider.connect();
    return provider;
  }).inSingletonScope();
}

// Bind MongoClient to an async factory that returns the connected client
container.bind<MongoClient>(MONGO_CLIENT).toDynamicValue(async () => {
  const mgr = await container.getAsync<IMongoConnMgr>('IMongoConnMgr');
  return mgr.getClient();
}).inSingletonScope();

// Bind ExpressServer
container.bind(ExpressServer).toSelf().inSingletonScope();

export { container };