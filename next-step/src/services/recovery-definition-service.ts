import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";
import { RecoveryDefinition } from "../types/types";

const path = "/api/users/recovery/definitions";

export const recoveryDefinitionService = {
  getRecoveryDefinition,
  getCurrentRecoveryDefinitions,
  createRecoveryDefinition,
  updateRecoveryDefinition,
  deleteRecoveryDefinition,
};

async function getRecoveryDefinition(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return handleResponse(response);
}

async function getCurrentRecoveryDefinitions() {
  const response = await fetch(
    `http://localhost:5000${path}/current`,
    getOptions
  );
  return handleResponse(response);
}

async function createRecoveryDefinition(model: RecoveryDefinition) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateRecoveryDefinition(id: number, model: RecoveryDefinition) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteRecoveryDefinition(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
