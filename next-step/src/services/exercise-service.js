import { handleResponse } from "../helpers/handle-response";
import { authHeader } from "../helpers/authentication-header";

const path = "/api/exercises";

export const exerciseService = {
  get,
  getAll,
};

const getOptions = {
  method: "GET",
};

async function get(id) {
  return await fetch(`http://localhost:5000${path}/${id}`, getOptions).then(
    handleResponse
  );
}

async function getAll() {
  return await fetch(`http://localhost:5000/api/exercises`, getOptions).then(
    handleResponse
  );
}
