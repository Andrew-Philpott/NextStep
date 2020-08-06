import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";
import * as types from "../types/types";

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
  return handleResponse(response);
}

async function getAllRecordsForExercise(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/exercises/${id}`,
    getOptions
  );
  return handleResponse(response);
}

async function getPRsForExercises() {
  const response = await fetch(
    `http://localhost:5000${path}/exercises/pr`,
    getOptions
  );
  return handleResponse(response);
}

async function getAllRecords() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return handleResponse(response);
}

async function createRecord(model: types.Record) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateRecord(id: number, model: types.Record) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteRecord(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
