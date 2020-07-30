import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";

const path = "/api/users/recoveries";

export const recoveryService = {
  getRecovery,
  getAllRecoveries,
  createRecovery,
  updateRecovery,
  deleteRecovery,
};

async function getRecovery(id) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return await handleResponse(response);
}

async function getAllRecoveries() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return await handleResponse(response);
}

async function createRecovery(model) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateRecovery(id, model) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteRecovery(id) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
