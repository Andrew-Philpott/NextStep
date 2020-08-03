import { User } from "../types/types";

const jsonParserUnknown = (jsonString: string): unknown =>
  JSON.parse(jsonString);

export const authHeader = () => {
  let userAsString: string | null = localStorage.getItem("user");
  console.log(userAsString);
  let user = null;
  if (userAsString) {
    user = jsonParserUnknown(userAsString) as User;
  }
  console.log(user);
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return { Authorization: "" };
  }
};
