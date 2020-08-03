import { authHeader } from "../helpers/authentication-header";

export const getOptions: RequestInit = {
  method: "GET",
  headers: authHeader(),
  mode: "cors",
};

export const putOptions = (model: object) => {
  const request: RequestInit = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
    mode: "cors",
  };
  return request;
};

export const deleteOptions: RequestInit = {
  method: "DELETE",
  headers: authHeader(),
  mode: "cors",
};

export const postOptions = (model: object) => {
  const request: RequestInit = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
    mode: "cors",
  };
  return request;
};
