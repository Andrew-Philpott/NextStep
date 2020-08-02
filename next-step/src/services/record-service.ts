import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";

const path = "/api/users/records";

export const recordService = {
  getRecord,
  getAllRecords,
  getAllRecordsForExercise,
  getPRsForExercises,
  createRecord,
  updateRecord,
  deleteRecord,
};

async function getRecord(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return await handleResponse(response);
}

async function getAllRecordsForExercise(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/exercises/${id}`,
    getOptions
  );
  return await handleResponse(response);
}

async function getPRsForExercises(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/exercises/pr`,
    getOptions
  );
  return await handleResponse(response);
}

async function getAllRecords() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return await handleResponse(response);
}

async function createRecord(model: object) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateRecord(id: number, model: object) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteRecord(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
