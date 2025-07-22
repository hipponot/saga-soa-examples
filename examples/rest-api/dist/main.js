// src/main.ts
import { ExpressServer as ExpressServer2 } from "@hipponot/soa-core-api/express-server";

// src/inversify.config.ts
import { Container } from "inversify";
import { MONGO_CLIENT } from "@hipponot/soa-db";
import { MockMongoProvider } from "@hipponot/soa-db/mocks/mock-mongo-provider";

// src/providers/mongo-provider.ts
import { MongoClient } from "mongodb";
var MongoProvider = class {
  instanceName;
  client = null;
  connectionString;
  constructor(connectionString, instanceName = "ProductionMongoDB") {
    this.connectionString = connectionString;
    this.instanceName = instanceName;
  }
  async connect() {
    if (this.isConnected()) {
      return;
    }
    try {
      this.client = new MongoClient(this.connectionString, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5e3,
        socketTimeoutMS: 45e3,
        family: 4,
        // Use IPv4, skip trying IPv6
        // MongoDB 8.0 specific options
        compressors: ["snappy", "zlib", "zstd"],
        zlibCompressionLevel: 6
      });
      await this.client.connect();
      await this.client.db("admin").command({ ping: 1 });
      console.log(`\u2705 Connected to MongoDB: ${this.instanceName}`);
    } catch (error) {
      console.error(`\u274C Failed to connect to MongoDB: ${this.instanceName}`, error);
      throw error;
    }
  }
  async disconnect() {
    if (this.client) {
      try {
        await this.client.close();
        console.log(`\u2705 Disconnected from MongoDB: ${this.instanceName}`);
      } catch (error) {
        console.error(`\u274C Error disconnecting from MongoDB: ${this.instanceName}`, error);
      } finally {
        this.client = null;
      }
    }
  }
  isConnected() {
    return !!this.client && !this.client.topology.isDestroyed();
  }
  getClient() {
    if (!this.client) {
      throw new Error(`MongoClient is not connected for instance: ${this.instanceName}`);
    }
    return this.client;
  }
  // Utility method to get database
  getDatabase(dbName) {
    const client = this.getClient();
    return client.db(dbName);
  }
  // Health check method
  async healthCheck() {
    try {
      if (!this.isConnected()) {
        return false;
      }
      await this.client.db("admin").command({ ping: 1 });
      return true;
    } catch (error) {
      console.error("MongoDB health check failed:", error);
      return false;
    }
  }
};

// src/inversify.config.ts
import { PinoLogger } from "@hipponot/soa-logger";
import { ExpressServer } from "@hipponot/soa-core-api/express-server";
var container = new Container();
var loggerConfig = {
  configType: "PINO_LOGGER",
  level: "info",
  isExpressContext: true,
  prettyPrint: true
};
container.bind("PinoLoggerConfig").toConstantValue(loggerConfig);
container.bind("ILogger").toDynamicValue(() => {
  const config = container.get("PinoLoggerConfig");
  return new PinoLogger(config);
}).inSingletonScope();
var isTestEnvironment = process.env.NODE_ENV === "test";
var mongoConnectionString = process.env.MONGODB_URL || "mongodb://localhost:27017/saga_app";
if (isTestEnvironment) {
  container.bind("IMongoConnMgr").toDynamicValue(async () => {
    const provider = new MockMongoProvider("TestMongoDB");
    await provider.connect();
    return provider;
  }).inSingletonScope();
} else {
  container.bind("IMongoConnMgr").toDynamicValue(async () => {
    const provider = new MongoProvider(mongoConnectionString, "ProductionMongoDB");
    await provider.connect();
    return provider;
  }).inSingletonScope();
}
container.bind(MONGO_CLIENT).toDynamicValue(async () => {
  const mgr = await container.getAsync("IMongoConnMgr");
  return mgr.getClient();
}).inSingletonScope();
container.bind(ExpressServer).toSelf().inSingletonScope();

// src/main.ts
import { loadControllers } from "@hipponot/soa-core-api/utils/loadControllers";
import { RestControllerBase } from "@hipponot/soa-core-api/rest-controller";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var expressConfig = {
  configType: "EXPRESS_SERVER",
  port: Number(process.env.PORT) || 3e3,
  logLevel: "info",
  name: "Example REST API"
};
container.bind("ExpressServerConfig").toConstantValue(expressConfig);
async function start() {
  const controllers = await loadControllers(
    path.resolve(__dirname, "./sectors/*.js"),
    RestControllerBase
  );
  const expressServer = container.get(ExpressServer2);
  await expressServer.init(container, controllers);
  expressServer.start();
}
start();
//# sourceMappingURL=main.js.map