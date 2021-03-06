import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";
import * as types from "../types/types";

const path = "/api/users/sessions";

export const sessionService = {
  getSession,
  getAllSessions,
  getCurrentSession,
  createSession,
  updateSession,
  deleteSession,
};

async function getSession(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return handleResponse(response);
}

async function getAllSessions() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return handleResponse(response);
}

async function getCurrentSession() {
  const response = await fetch(
    `http://localhost:5000${path}/current`,
    getOptions
  );
  return handleResponse(response);
}

async function createSession(model: object) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateSession(id: number, model: object) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteSession(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
