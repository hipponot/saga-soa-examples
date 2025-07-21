import {
  __name
} from "../../../chunk-7QVYU63E.js";

// src/sectors/user/rest/user-routes.ts
import { Get, Controller } from "routing-controllers";
import { injectable, inject } from "inversify";
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
var SECTOR = "user";
var UserRestController = class extends RestControllerBase {
  static {
    __name(this, "UserRestController");
  }
  sectorName = SECTOR;
  constructor(logger) {
    super(logger, SECTOR);
  }
  testRoute() {
    this.logger.info("User REST route hit");
    return "User REST route OK";
  }
  async init() {
  }
};
_ts_decorate([
  Get("/test-route"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", void 0)
], UserRestController.prototype, "testRoute", null);
UserRestController = _ts_decorate([
  Controller(`/${REST_API_BASE_PATH}/${SECTOR}`),
  injectable(),
  _ts_param(0, inject("ILogger")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof ILogger === "undefined" ? Object : ILogger
  ])
], UserRestController);
export {
  UserRestController
};
//# sourceMappingURL=user-routes.js.map