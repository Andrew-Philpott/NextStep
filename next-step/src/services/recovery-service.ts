import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";
import * as types from "../types/types";

const path = "/api/users/recoveries";

export const recoveryService = {
  getRecovery,
  getAllRecoveries,
  createRecovery,
  updateRecovery,
  deleteRecovery,
};

async function getRecovery(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return handleResponse(response);
}

async function getAllRecoveries() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return handleResponse(response);
}

async function createRecovery(model: types.Recovery) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateRecovery(id: number, model: types.Recovery) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteRecovery(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
