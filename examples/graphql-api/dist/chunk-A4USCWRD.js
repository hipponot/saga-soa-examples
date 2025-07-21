import {
  __name
} from "./chunk-7QVYU63E.js";

// src/sectors/user/gql/user.data.ts
var users = [];
function createUser(user) {
  users.push(user);
  return user;
}
__name(createUser, "createUser");
function getUsers() {
  return users;
}
__name(getUsers, "getUsers");
function getUserById(id) {
  return users.find((u) => u.id === id);
}
__name(getUserById, "getUserById");

export {
  users,
  createUser,
  getUsers,
  getUserById
};
//# sourceMappingURL=chunk-A4USCWRD.js.map