import {
  __name
} from "../chunk-6AXVLTU5.js";

// src/sectors/hello-mongo.ts
import { Get, Post, Controller, HttpCode } from "routing-controllers";
import { injectable, inject } from "inversify";
import { ObjectId } from "mongodb";
import { MONGO_CLIENT } from "@saga/soa-db";
import { RestControllerBase, REST_API_BASE_PATH } from "@saga/soa-core-api/rest-controller";
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
__name(_ts_decorate, "_ts_decorate");
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
__name(_ts_metadata, "_ts_metadata");
function _ts_param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var SECTOR = "hello-mongo";
var TEST_COLLECTION = "hello_mongo_test";
var TEST_DOC = {
  _id: new ObjectId("64b7f8f8f8f8f8f8f8f8f8f8"),
  message: "Hello from Mongo!"
};
var HelloMongo = class extends RestControllerBase {
  static {
    __name(this, "HelloMongo");
  }
  client;
  sectorName = SECTOR;
  constructor(logger, client) {
    super(logger, SECTOR), this.client = client;
  }
  async writeDoc() {
    const db = this.client.db();
    await db.collection(TEST_COLLECTION).insertOne(TEST_DOC);
    return {
      ok: true
    };
  }
  async readDoc() {
    const db = this.client.db();
    const doc = await db.collection(TEST_COLLECTION).findOne({
      _id: TEST_DOC._id
    });
    if (!doc) return {
      error: "Not found"
    };
    return doc;
  }
  async init() {
  }
};
_ts_decorate([
  Post("/test-write"),
  HttpCode(201),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", Promise)
], HelloMongo.prototype, "writeDoc", null);
_ts_decorate([
  Get("/test-read"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", Promise)
], HelloMongo.prototype, "readDoc", null);
HelloMongo = _ts_decorate([
  Controller(`/${REST_API_BASE_PATH}/${SECTOR}`),
  injectable(),
  _ts_param(0, inject("ILogger")),
  _ts_param(1, inject(MONGO_CLIENT)),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof ILogger === "undefined" ? Object : ILogger,
    typeof MongoClient === "undefined" ? Object : MongoClient
  ])
], HelloMongo);
export {
  HelloMongo
};
//# sourceMappingURL=hello-mongo.js.map