import { Container } from 'inversify';
import type { MongoClient } from 'mongodb';
import { MONGO_CLIENT } from '@hipponot/soa-db';
import type { IMongoConnMgr } from '@hipponot/soa-db';
import { MockMongoProvider } from '@hipponot/soa-db/mocks/mock-mongo-provider';
import type { ILogger, PinoLoggerConfig } from '@hipponot/soa-logger';
import { PinoLogger } from '@hipponot/soa-logger';
import { ExpressServer } from '@hipponot/soa-core-api/express-server';

// Test-only container with MockMongoProvider
export function createTestContainer(): Container {
    const container = new Container();

    // Test logger config (less verbose)
    const loggerConfig: PinoLoggerConfig = {
        configType: 'PINO_LOGGER',
        level: 'warn', // Less verbose for tests
        isExpressContext: true,
        prettyPrint: false, // No pretty printing in tests
    };

    container.bind<PinoLoggerConfig>('PinoLoggerConfig').toConstantValue(loggerConfig);

    // Bind Logger
    container.bind<ILogger>('ILogger').toDynamicValue(() => {
        const config = container.get<PinoLoggerConfig>('PinoLoggerConfig');
        return new PinoLogger(config);
    }).inSingletonScope();

    // Use MockMongoProvider for tests
    container.bind<IMongoConnMgr>('IMongoConnMgr').toDynamicValue(async () => {
        const provider = new MockMongoProvider('TestMongoDB');
        await provider.connect();
        return provider;
    }).inSingletonScope();

    // Bind MongoClient to an async factory that returns the connected client
    container.bind<MongoClient>(MONGO_CLIENT).toDynamicValue(async () => {
        const mgr = await container.getAsync<IMongoConnMgr>('IMongoConnMgr');
        return mgr.getClient();
    }).inSingletonScope();

    // Bind ExpressServer
    container.bind(ExpressServer).toSelf().inSingletonScope();

    return container;
} 