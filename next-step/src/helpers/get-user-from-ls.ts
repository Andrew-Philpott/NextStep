import * as types from "../types/types";

function getUserFromLs() {
  let userString = localStorage.getItem("user");
  let user: types.User | null = null;
  if (userString) {
    user = JSON.parse(userString) as types.User;
    if (user && user.token) {
      return user;
    } else {
      return null;
    }
  }
  return null;
}
export default getUserFromLs;
