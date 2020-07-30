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

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(
    `http://localhost:5000${path}/authenticate`,
    requestOptions
  );
  return await handleResponse(response);
}

function logout() {
  localStorage.removeItem("user");
}

async function register(model) {
  const response = await fetch(
    `http://localhost:5000/api/users/register`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateUser(model) {
  const response = await fetch(
    `http://localhost:5000/api/users`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteUser(id) {
  const response = await fetch(
    `http://localhost:5000/api/users/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
