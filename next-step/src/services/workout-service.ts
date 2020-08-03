import { handleResponse } from "../helpers/handle-response";

import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";

export type User = {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  token?: string;
};

export function authHeader() {
  let userString = localStorage.getItem("user");
  console.log("userstring");
  console.log(userString);
  let user: User | null = null;
  if (userString) {
    user = JSON.parse(userString) as User;
  }
  console.log(user);
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return { Authorization: "" };
  }
}

const path = "/api/users/workouts";

export const workoutService = {
  getWorkout,
  getAllWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};

async function getWorkout(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    getOptions
  );
  return await handleResponse(response);
}

async function getAllWorkouts() {
  console.log("get all workouts");
  console.log(getOptions);
  const response = await fetch(`http://localhost:5000${path}`, {
    method: "GET",
    headers: authHeader(),
  });
  return await handleResponse(response);
}

async function createWorkout(model: object) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return await handleResponse(response);
}

async function updateWorkout(id: number, model: object) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return await handleResponse(response);
}

async function deleteWorkout(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return await handleResponse(response);
}
