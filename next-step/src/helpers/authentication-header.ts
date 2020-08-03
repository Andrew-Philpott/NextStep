export type User = {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  token?: string;
};

export function authHeader() {
  let userString = localStorage.getItem("user");
  let user: User | null = null;
  if (userString) {
    user = JSON.parse(userString) as User;
  }

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return { Authorization: "" };
  }
}
