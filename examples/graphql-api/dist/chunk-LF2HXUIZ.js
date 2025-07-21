import {
  Session
} from "./chunk-EXJUTQ3R.js";
import {
  createSession,
  getSessionById,
  sessions
} from "./chunk-ZONZ23MC.js";
import {
  SessionInput
} from "./chunk-3OH7VBAU.js";
import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/session/gql/session.resolver.ts
import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { inject } from "inversify";
import { GQLControllerBase } from "@saga/soa-core-api/gql-controller";
import { v4 as uuidv4 } from "uuid";
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
var SessionResolver = class extends GQLControllerBase {
  static {
    __name(this, "SessionResolver");
  }
  sectorName = "session";
  constructor(logger) {
    super(logger);
  }
  allSessions() {
    return sessions;
  }
  session(id) {
    return getSessionById(id);
  }
  addSession(input) {
    const session = Object.assign(new Session(), input, {
      id: uuidv4()
    });
    return createSession(session);
  }
};
_ts_decorate([
  Query(() => [
    Session
  ]),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", void 0)
], SessionResolver.prototype, "allSessions", null);
_ts_decorate([
  Query(() => Session, {
    nullable: true
  }),
  _ts_param(0, Arg("id")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", void 0)
], SessionResolver.prototype, "session", null);
_ts_decorate([
  Mutation(() => Session),
  _ts_param(0, Arg("input")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof SessionInput === "undefined" ? Object : SessionInput
  ]),
  _ts_metadata("design:returntype", void 0)
], SessionResolver.prototype, "addSession", null);
SessionResolver = _ts_decorate([
  Resolver(() => Session),
  _ts_param(0, inject("ILogger")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof ILogger === "undefined" ? Object : ILogger
  ])
], SessionResolver);

export {
  SessionResolver
};
//# sourceMappingURL=chunk-LF2HXUIZ.js.map