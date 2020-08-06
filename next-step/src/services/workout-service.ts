import { handleResponse } from "../helpers/handle-response";
import {
  getOptions,
  putOptions,
  postOptions,
  deleteOptions,
} from "./request-options";
import { Workout } from "../types/types";

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
  return handleResponse(response);
}

async function getAllWorkouts() {
  const response = await fetch(`http://localhost:5000${path}`, getOptions);
  return handleResponse(response);
}

async function createWorkout(model: Workout) {
  const response = await fetch(
    `http://localhost:5000${path}`,
    postOptions(model)
  );
  return handleResponse(response);
}

async function updateWorkout(id: number, model: Workout) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    putOptions(model)
  );
  return handleResponse(response);
}

async function deleteWorkout(id: number) {
  const response = await fetch(
    `http://localhost:5000${path}/${id}`,
    deleteOptions
  );
  return handleResponse(response);
}
