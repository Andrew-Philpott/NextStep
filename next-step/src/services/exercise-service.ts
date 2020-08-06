import { handleResponse } from "../helpers/handle-response";
import { getOptions } from "./request-options";

const path = "/api/exercises";

export const exerciseService = {
  get,
  getAll,
};

async function get(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return handleResponse(response);
}

async function getAll() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return handleResponse(response);
}
