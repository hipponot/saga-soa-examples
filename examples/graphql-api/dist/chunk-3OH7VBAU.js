import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/session/gql/session.input.ts
import { Field, InputType, Int } from "type-graphql";
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
var SessionInput = class {
  static {
    __name(this, "SessionInput");
  }
  tutor;
  student;
  date;
  duration;
  notes;
};
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], SessionInput.prototype, "tutor", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", String)
], SessionInput.prototype, "student", void 0);
_ts_decorate([
  Field(),
  _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], SessionInput.prototype, "date", void 0);
_ts_decorate([
  Field(() => Int),
  _ts_metadata("design:type", Number)
], SessionInput.prototype, "duration", void 0);
_ts_decorate([
  Field({
    nullable: true
  }),
  _ts_metadata("design:type", String)
], SessionInput.prototype, "notes", void 0);
SessionInput = _ts_decorate([
  InputType()
], SessionInput);

export {
  SessionInput
};
//# sourceMappingURL=chunk-3OH7VBAU.js.map