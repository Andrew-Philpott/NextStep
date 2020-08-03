import { handleResponse } from "../helpers/handle-response";
import { putOptions, postOptions, deleteOptions } from "./request-options";
import * as types from "../types/types";
const path = "/api/users";

export const userService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
};

async function login(username: string, password: string) {
  const model = { username, password };
  const response = await fetch(
    `http://localhost:5000${path}/authenticate`,
    postOptions(model)
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
