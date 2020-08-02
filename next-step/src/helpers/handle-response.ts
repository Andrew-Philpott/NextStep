import { userService } from "../services/user-service";

export async function handleResponse(response: Response) {
  const text = await response.text();
  let data = text && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      userService.logout();
    }
    return ((await data) && data.message) || response.statusText;
  }
  return await data;
}
