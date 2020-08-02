import { handleResponse } from "../helpers/handle-response";
import { putOptions, postOptions, deleteOptions } from "./request-options";

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
  console.log(username, password);
  const response = await fetch(
    `http://localhost:5000${path}/authenticate`,
    requestOptions
  );
  return await handleResponse(response);
}

function logout() {
  localStorage.removeItem("user");
}

async function register(model: object) {
  const response = await fetch(
    `http://localhost:5000/api/users/register`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateUser(model: object) {
  const response = await fetch(
    `http://localhost:5000/api/users`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteUser(id: number) {
  const response = await fetch(
    `http://localhost:5000/api/users/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
