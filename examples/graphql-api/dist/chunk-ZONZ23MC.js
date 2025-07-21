import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/session/gql/session.data.ts
var sessions = [];
function createSession(session) {
  sessions.push(session);
  return session;
}
__name(createSession, "createSession");
function getSessions() {
  return sessions;
}
__name(getSessions, "getSessions");
function getSessionById(id) {
  return sessions.find((s) => s.id === id);
}
__name(getSessionById, "getSessionById");

export {
  sessions,
  createSession,
  getSessions,
  getSessionById
};
//# sourceMappingURL=chunk-ZONZ23MC.js.map