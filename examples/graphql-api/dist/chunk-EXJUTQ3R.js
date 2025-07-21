import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/session/gql/session.type.ts
import { Field, ObjectType, ID, Int } from "type-graphql";
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
var Session = class {
  static {
    __name(this, "Session");
  }
  id;
  tutor;
  student;
  date;
  duration;
  notes;
};
_ts_decorate([
  Field(() => ID),
  _ts_metadata("design:type", String)
], Session.prototype, "id", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], Session.prototype, "tutor", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], Session.prototype, "student", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Session.prototype, "date", void 0);
_ts_decorate([
  Field(() => Int),
  _ts_metadata("design:type", Number)
], Session.prototype, "duration", void 0);
_ts_decorate([
  Field({
    nullable: true
  }),
  _ts_metadata("design:type", String)
], Session.prototype, "notes", void 0);
Session = _ts_decorate([
  ObjectType()
], Session);

export {
  Session
};
//# sourceMappingURL=chunk-EXJUTQ3R.js.map