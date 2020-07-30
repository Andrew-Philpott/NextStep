import { authHeader } from "../helpers/authentication-header";

export const getOptions = {
  method: "GET",
  headers: authHeader(),
};

export const putOptions = (model) => {
  return {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
};

export const deleteOptions = {
  method: "DELETE",
  headers: authHeader(),
};

export const postOptions = (model) => {
  return {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
};
