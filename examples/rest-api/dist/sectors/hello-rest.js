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

// src/sectors/hello-rest.ts
import { Get, Controller } from "routing-controllers";
import { injectable, inject } from "inversify";
import { RestControllerBase, REST_API_BASE_PATH } from "@hipponot/soa-core-api/rest-controller";
var SECTOR = "hello";
var HelloRest = class extends RestControllerBase {
  sectorName = SECTOR;
  constructor(logger) {
    super(logger, SECTOR);
  }
  testRoute() {
    this.logger.info("Hello route hit");
    return "Hello";
  }
  async init() {
  }
};
__decorateClass([
  Get("/test-route")
], HelloRest.prototype, "testRoute", 1);
HelloRest = __decorateClass([
  Controller(`/${REST_API_BASE_PATH}/${SECTOR}`),
  injectable(),
  __decorateParam(0, inject("ILogger"))
], HelloRest);
export {
  HelloRest
};
//# sourceMappingURL=hello-rest.js.map