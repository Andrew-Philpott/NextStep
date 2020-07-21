import { userService } from "../services/user-service";

export async function handleResponse(response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      userService.logout();
    }

    const error = ((await data) && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return await data;
}
