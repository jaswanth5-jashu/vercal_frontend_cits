import { apiRequest } from "./api.js";

export const registerHackathon = (data) => {
  return apiRequest("/hackathonregister/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
