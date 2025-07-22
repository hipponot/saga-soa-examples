import {
  createUser,
  getUserById,
  users
} from "./chunk-A4USCWRD.js";
import {
  UserInput
} from "./chunk-K6QKO6DM.js";
import {
  User
} from "./chunk-ODCTC6ND.js";
import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/user/gql/user.resolver.ts
import { Query, Resolver, Arg, Mutation } from "type-graphql";
import { inject } from "inversify";
import { GQLControllerBase } from "@hipponot/soa-core-api/gql-controller";
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
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
__name(_ts_param, "_ts_param");
var UserResolver = class extends GQLControllerBase {
  static {
    __name(this, "UserResolver");
  }
  sectorName = "user";
  constructor(logger) {
    super(logger);
  }
  allUsers() {
    return users;
  }
  user(id) {
    return getUserById(id);
  }
  addUser(input) {
    const user = Object.assign(new User(), input, {
      id: uuidv4()
    });
    return createUser(user);
  }
};
_ts_decorate([
  Query(() => [
    User
  ]),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", []),
  _ts_metadata("design:returntype", void 0)
], UserResolver.prototype, "allUsers", null);
_ts_decorate([
  Query(() => User, {
    nullable: true
  }),
  _ts_param(0, Arg("id")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    String
  ]),
  _ts_metadata("design:returntype", void 0)
], UserResolver.prototype, "user", null);
_ts_decorate([
  Mutation(() => User),
  _ts_param(0, Arg("input")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof UserInput === "undefined" ? Object : UserInput
  ]),
  _ts_metadata("design:returntype", void 0)
], UserResolver.prototype, "addUser", null);
UserResolver = _ts_decorate([
  Resolver(() => User),
  _ts_param(0, inject("ILogger")),
  _ts_metadata("design:type", Function),
  _ts_metadata("design:paramtypes", [
    typeof ILogger === "undefined" ? Object : ILogger
  ])
], UserResolver);

export {
  UserResolver
};
//# sourceMappingURL=chunk-Q2WF2TWV.js.map