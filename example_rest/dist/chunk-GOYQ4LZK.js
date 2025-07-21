import {
  __name
} from "./chunk-SHUYVCID.js";

// src/sectors/hello-rest.ts
import { Controller, Get } from "routing-controllers";
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
var HelloRest = class {
  static {
    __name(this, "HelloRest");
  }
  helloRoute() {
    return "Hello";
  }
};
_ts_decorate([
  Get("/hello"),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", void 0)
], HelloRest.prototype, "helloRoute", null);
HelloRest = _ts_decorate([
  Controller("/saga-soa/hello")
], HelloRest);

export {
  HelloRest
};
