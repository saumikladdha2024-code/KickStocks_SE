import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// Single shared axios instance — base URL + sane timeout.
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Normalize errors at the source so every hook gets a consistent, readable
// message instead of having to branch on axios internals (ECONNREFUSED vs
// timeout vs a real HTTP error from FastAPI).
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const detail = error.response.data?.detail;
      error.friendlyMessage =
        typeof detail === "string"
          ? detail
          : `Backend returned an error (status ${error.response.status}).`;
    } else if (error.code === "ECONNABORTED") {
      error.friendlyMessage = "The backend took too long to respond. Please try again.";
    } else {
      error.friendlyMessage = `Couldn't reach the backend at ${API_BASE_URL}. Make sure it's running.`;
    }
    return Promise.reject(error);
  }
);