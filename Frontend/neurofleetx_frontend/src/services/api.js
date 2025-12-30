import axios from "axios";

// Determine base URL: use env variable, or in dev mode use relative URLs for proxy
const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // In development, use relative URLs to leverage Vite proxy (avoids CORS)
  // This works when accessing the app on localhost:3000
  if (import.meta.env.DEV) {
    return ""; // Empty string = relative URLs, uses current origin
  }
  // Production fallback
  return "http://localhost:8081";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Log the base URL in development for debugging
if (import.meta.env.DEV) {
  console.log("API Base URL:", api.defaults.baseURL || "relative (current origin)");
  console.log("Current origin:", window.location.origin);
}

// Optional: interceptor (future use for JWT)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  // Add token to all requests except login and signup
  const isAuthEndpoint = config.url.includes("/login") || config.url.includes("/signup");
  if (!isAuthEndpoint) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
