import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";

const path = "/api/users/sessions";

export const sessionService = {
  getSession,
  getAllSessions,
  getCurrentSession,
  createSession,
  updateSession,
  deleteSession,
};

async function getSession(id) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return await handleResponse(response);
}

async function getAllSessions() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return await handleResponse(response);
}

async function getCurrentSession() {
  const response = await fetch(
    `http://localhost:5000${path}/current`,
    getOptions
  );
  return await handleResponse(response);
}

async function createSession(model) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateSession(id, model) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteSession(id) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
