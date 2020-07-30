import { userService } from "../services/user-service";

export async function handleResponse(response) {
  const text = await response.text();
  (await text) && console.log(text);
  let data = (await text) && JSON.parse(text);
  if (!response.ok) {
    if (response.status === 401) {
      userService.logout();
    }
    return ((await data) && data.message) || response.statusText;
  }
  (await data) && console.log(data);
  return await data;
}
