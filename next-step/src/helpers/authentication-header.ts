type User = { token: string | undefined } | null;

const jsonParserUnknown = (jsonString: string): unknown =>
  JSON.parse(jsonString);

export const authHeader = () => {
  let userAsString: string | null = localStorage.getItem("user");
  let user: User = { token: undefined };
  if (userAsString) {
    user = jsonParserUnknown(userAsString) as User;
  }
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return { Authorization: "" };
  }
};
