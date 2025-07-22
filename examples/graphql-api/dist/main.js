import {
  container
} from "./chunk-DQXPPVM6.js";
import {
  __name
} from "./chunk-7QVYU63E.js";

// src/main.ts
import "reflect-metadata";
import { ExpressServer } from "@hipponot/soa-core-api/express-server";
import { loadControllers } from "@hipponot/soa-core-api/utils/loadControllers";
import { RestControllerBase } from "@hipponot/soa-core-api/rest-controller";
import { GQLControllerBase } from "@hipponot/soa-core-api/gql-controller";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var expressConfig = {
  configType: "EXPRESS_SERVER",
  port: Number(process.env.PORT) || 4e3,
  logLevel: "info",
  name: "Example GraphQL API"
};
container.bind("ExpressServerConfig").toConstantValue(expressConfig);
async function start() {
  const controllers = await loadControllers([
    path.resolve(__dirname, "./sectors/user/rest/*.js"),
    path.resolve(__dirname, "./sectors/session/rest/*.js")
  ], RestControllerBase);
  const expressServer = container.get(ExpressServer);
  await expressServer.init(container, controllers);
  const app = expressServer.getApp();
  app.use(express.json());
  const resolvers = await loadControllers([
    path.resolve(__dirname, "./sectors/user/gql/*.js"),
    path.resolve(__dirname, "./sectors/session/gql/*.js")
  ], GQLControllerBase);
  const schema = await buildSchema({
    // @ts-expect-error - loadControllers returns a tuple, but buildSchema expects an array
    resolvers
  });
  const apolloServer = new ApolloServer({
    schema
  });
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer, {
    context: /* @__PURE__ */ __name(async () => ({}), "context")
  }));
  expressServer.start();
}
__name(start, "start");
start();
//# sourceMappingURL=main.js.map