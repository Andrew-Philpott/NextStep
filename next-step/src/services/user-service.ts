import { handleResponse } from "../helpers/handle-response";
import { putOptions, postOptions, deleteOptions } from "./request-options";
import history from "../helpers/history";

const path = "/api/users";

export const userService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
};

async function login(username: string, password: string) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };
  const response = await fetch(
    `http://localhost:5000${path}/authenticate`,
    requestOptions
  );
  return handleResponse(response);
}

function logout() {
  localStorage.removeItem("user");
}

async function register(model: object) {
  const response = await fetch(
    `http://localhost:5000/api/users/register`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateUser(model: object) {
  const response = await fetch(
    `http://localhost:5000/api/users`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteUser(id: number) {
  const response = await fetch(
    `http://localhost:5000/api/users/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
