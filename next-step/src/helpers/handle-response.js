import { userService } from "../services/user-service";

export async function handleResponse(response) {
  const result = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      userService.logout();
    }
    const error = ((await result) && result.message) || response.statusText;
    return Promise.reject(error);
  }
  return await result;
}
