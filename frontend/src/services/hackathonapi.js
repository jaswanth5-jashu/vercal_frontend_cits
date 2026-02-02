import { apiRequest } from "./api.js";

export const registerHackathon = (data) => {
  return apiRequest("/hackathon/register/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
