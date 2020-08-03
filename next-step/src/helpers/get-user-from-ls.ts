import * as types from "../types/types";

export const getUserFromLs = () => {
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
};
