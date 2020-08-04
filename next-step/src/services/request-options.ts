import authHeader from "../helpers/authentication-header";

export const getOptions: RequestInit = {
  method: "GET",
  headers: authHeader(),
};

export const putOptions = (model: object) => {
  const request: RequestInit = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};

export const deleteOptions: RequestInit = {
  method: "DELETE",
  headers: authHeader(),
};

export const postOptions = (model: object) => {
  const request: RequestInit = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(model),
  };
  return request;
};
