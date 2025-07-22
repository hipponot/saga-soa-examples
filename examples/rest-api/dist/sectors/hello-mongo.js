var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);

// src/sectors/hello-mongo.ts
import { Get, Post, Controller, HttpCode } from "routing-controllers";
import { injectable, inject } from "inversify";
import { ObjectId } from "mongodb";
import { MONGO_CLIENT } from "@hipponot/soa-db";
import { RestControllerBase, REST_API_BASE_PATH } from "@hipponot/soa-core-api/rest-controller";
var SECTOR = "hello-mongo";
var TEST_COLLECTION = "hello_mongo_test";
var TEST_DOC = { _id: new ObjectId("64b7f8f8f8f8f8f8f8f8f8f8"), message: "Hello from Mongo!" };
var HelloMongo = class extends RestControllerBase {
  constructor(logger, client) {
    super(logger, SECTOR);
    this.client = client;
  }
  sectorName = SECTOR;
  async writeDoc() {
    const db = this.client.db();
    await db.collection(TEST_COLLECTION).insertOne(TEST_DOC);
    return { ok: true };
  }
  async readDoc() {
    const db = this.client.db();
    const doc = await db.collection(TEST_COLLECTION).findOne({ _id: TEST_DOC._id });
    if (!doc) return { error: "Not found" };
    return doc;
  }
  async init() {
  }
};
__decorateClass([
  Post("/test-write"),
  HttpCode(201)
], HelloMongo.prototype, "writeDoc", 1);
__decorateClass([
  Get("/test-read")
], HelloMongo.prototype, "readDoc", 1);
HelloMongo = __decorateClass([
  Controller(`/${REST_API_BASE_PATH}/${SECTOR}`),
  injectable(),
  __decorateParam(0, inject("ILogger")),
  __decorateParam(1, inject(MONGO_CLIENT))
], HelloMongo);
export {
  HelloMongo
};
//# sourceMappingURL=hello-mongo.js.map