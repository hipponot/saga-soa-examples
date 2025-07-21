// src/inversify.config.ts
import { Container } from "inversify";
import { MONGO_CLIENT } from "@saga/soa-db";
import { MockMongoProvider } from "@saga/soa-db/mocks/mock-mongo-provider";
import { PinoLogger } from "@saga/soa-logger";
import { ExpressServer } from "@saga/soa-core-api/express-server";
var container = new Container();
var loggerConfig = {
  configType: "PINO_LOGGER",
  level: "info",
  isExpressContext: true,
  prettyPrint: true
};
container.bind("PinoLoggerConfig").toConstantValue(loggerConfig);
container.bind("ILogger").to(PinoLogger).inSingletonScope();
container.bind("IMongoConnMgr").toDynamicValue(async () => {
  const provider = new MockMongoProvider("MockMongoDB");
  await provider.connect();
  return provider;
}).inSingletonScope();
container.bind(MONGO_CLIENT).toDynamicValue(async () => {
  const mgr = await container.getAsync("IMongoConnMgr");
  return mgr.getClient();
}).inSingletonScope();
container.bind(ExpressServer).toSelf().inSingletonScope();

export {
  container
};
//# sourceMappingURL=chunk-O3KDZVJP.js.map