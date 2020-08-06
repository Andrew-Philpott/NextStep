import getUserFromLs from "./get-user-from-ls";

function authHeader(): HeadersInit {
  const user = getUserFromLs();
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
    };
  } else {
    return { Authorization: "" };
  }
}
export default authHeader;
