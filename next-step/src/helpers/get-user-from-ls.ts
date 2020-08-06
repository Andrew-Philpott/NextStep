import { User } from "../types/types";

function getUserFromLs() {
  let userString = localStorage.getItem("user");
  let user: User | null = null;
  if (userString) {
    user = JSON.parse(userString);
    if (user && user.token) {
      return user;
    } else {
      return null;
    }
  }
  return null;
}
export default getUserFromLs;
