import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/user/gql/user.type.ts
import { Field, ObjectType, ID } from "type-graphql";
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
var User = class {
  static {
    __name(this, "User");
  }
  id;
  name;
  email;
  role;
};
_ts_decorate([
  Field(() => ID),
  _ts_metadata("design:type", String)
], User.prototype, "id", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
  Field({
    nullable: true
  }),
  _ts_metadata("design:type", String)
], User.prototype, "role", void 0);
User = _ts_decorate([
  ObjectType()
], User);

export {
  User
};
//# sourceMappingURL=chunk-ODCTC6ND.js.map