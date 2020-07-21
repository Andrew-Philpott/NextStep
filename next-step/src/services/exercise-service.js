import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/authentication-header";

const path = "/api/exercises";

export const exerciseService = {
  get,
  getAll,
};

const getOptions = {
  method: "GET",
  headers: authHeader(),
};

function get(id) {
  return fetch(`http://localhost:5000${path}/${id}`, getOptions).then(
    handleResponse
  );
}

function getAll() {
  return fetch(`http://localhost:5000${path}`, getOptions).then(handleResponse);
}
