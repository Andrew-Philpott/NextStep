import { authHeader } from "../helpers/authentication-header";
import { handleResponse } from "../helpers/handle-response";

export const userService = {
  login,
  logout,
  register,
  updateUser,
  deleteUser,
  getRecord,
  getRecordsByExercise,
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
  getRecovery,
  getAllRecoveries,
  createRecovery,
  updateRecovery,
  deleteRecovery,
  getSession,
  getAllSessions,
  getCurrentSession,
  createSession,
  updateSession,
  deleteSession,
  getExercise,
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  getWorkout,
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  deleteExerciseFromWorkout,
};

const getOptions = {
  method: "GET",
  headers: authHeader(),
};

const putOptions = (model) => {
  return {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
};

const deleteOptions = {
  method: "DELETE",
  headers: authHeader(),
};

const postOptions = (model) => {
  return {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
};

const paths = {
  record: `/api/users/records`,
  recovery: `/api/users/recoveries`,
  session: `/api/users/sessions`,
  exercise: `/api/users/exercises`,
  workout: `/api/users/workouts`,
};

async function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(
    `http://localhost:5000/api/users/authenticate`,
    requestOptions
  );
  return await handleResponse(response);
}

function logout() {
  localStorage.removeItem("user");
}

async function register(model) {
  return await fetch(
    `http://localhost:5000/api/users/register`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateUser(model) {
  return await fetch(`http://localhost:5000/api/users`, putOptions(model)).then(
    handleResponse
  );
}

async function deleteUser(id) {
  return await fetch(
    `http://localhost:5000/api/users/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function getRecord(id) {
  return await fetch(
    `http://localhost:5000${paths.record}/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getRecordsByExercise(id) {
  return await fetch(
    `http://localhost:5000${paths.record}/exercises/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getAllRecords() {
  return await fetch(`http://localhost:5000${paths.record}`, getOptions).then(
    handleResponse
  );
}

async function createRecord(model) {
  return await fetch(
    `http://localhost:5000${paths.record}`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateRecord(id, model) {
  return await fetch(
    `http://localhost:5000${paths.record}/${id}`,
    putOptions(model)
  ).then(handleResponse);
}

async function deleteRecord(id) {
  return await fetch(
    `http://localhost:5000${paths.record}/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function getRecovery(id) {
  return await fetch(
    `http://localhost:5000${paths.recovery}/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getAllRecoveries() {
  return await fetch(`http://localhost:5000${paths.recovery}`, getOptions).then(
    handleResponse
  );
}

async function createRecovery(model) {
  return await fetch(
    `http://localhost:5000${paths.recovery}`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateRecovery(id, model) {
  return await fetch(
    `http://localhost:5000${paths.recovery}/${id}`,
    putOptions(model)
  ).then(handleResponse);
}

async function deleteRecovery(id) {
  return await fetch(
    `http://localhost:5000${paths.recovery}/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function getSession(id) {
  return await fetch(
    `http://localhost:5000${paths.session}/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getAllSessions() {
  return await fetch(`http://localhost:5000${paths.session}`, getOptions).then(
    handleResponse
  );
}

async function getCurrentSession() {
  return await fetch(
    `http://localhost:5000${paths.session}/current`,
    getOptions
  ).then(handleResponse);
}

async function createSession(model) {
  return await fetch(
    `http://localhost:5000${paths.session}`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateSession(id, model) {
  return await fetch(
    `http://localhost:5000${paths.session}/${id}`,
    putOptions(model)
  ).then(handleResponse);
}

async function deleteSession(id) {
  return await fetch(
    `http://localhost:5000${paths.session}/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function getExercise(id) {
  return await fetch(
    `http://localhost:5000${paths.exercise}/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getAllExercises() {
  return await fetch(`http://localhost:5000${paths.exercise}`, getOptions).then(
    handleResponse
  );
}

async function createExercise(model) {
  return await fetch(
    `http://localhost:5000${paths.exercise}`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateExercise(id, model) {
  return await fetch(
    `http://localhost:5000${paths.exercise}/${id}`,
    putOptions(model)
  ).then(handleResponse);
}

async function deleteExercise(id) {
  return await fetch(
    `http://localhost:5000${paths.exercise}/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function getWorkout(id) {
  return await fetch(
    `http://localhost:5000${paths.workout}/${id}`,
    getOptions
  ).then(handleResponse);
}

async function getAllWorkouts() {
  return await fetch(`http://localhost:5000${paths.workout}`, getOptions).then(
    handleResponse
  );
}

async function createWorkout(model) {
  return await fetch(
    `http://localhost:5000${paths.workout}`,
    postOptions(model)
  ).then(handleResponse);
}

async function updateWorkout(id, model) {
  return await fetch(
    `http://localhost:5000${paths.workout}/${id}`,
    putOptions(model)
  ).then(handleResponse);
}

async function deleteWorkout(id) {
  return await fetch(
    `http://localhost:5000${paths.workout}/${id}`,
    deleteOptions
  ).then(handleResponse);
}

async function deleteExerciseFromWorkout(id, eid) {
  return await fetch(
    `http://localhost:5000${paths.workout}/${id}/exercises/${eid}`,
    deleteOptions
  ).then(handleResponse);
}
