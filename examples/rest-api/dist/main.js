import {
  container
} from "./chunk-O3KDZVJP.js";
import {
  __name
} from "./chunk-6AXVLTU5.js";

// src/main.ts
import { ExpressServer } from "@saga/soa-core-api/express-server";
import { loadControllers } from "@saga/soa-core-api/utils/loadControllers";
import { RestControllerBase } from "@saga/soa-core-api/rest-controller";
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
  const controllers = await loadControllers(path.resolve(__dirname, "./sectors/*.js"), RestControllerBase);
  const expressServer = container.get(ExpressServer);
  await expressServer.init(container, controllers);
  expressServer.start();
}
__name(start, "start");
start();
//# sourceMappingURL=main.js.map