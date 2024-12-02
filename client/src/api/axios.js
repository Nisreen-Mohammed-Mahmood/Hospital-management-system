import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized access
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if successful
    return response;
  },
  (error) => {
    // Check if the error response status is 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.clear();

      // Optionally, redirect to the login page or display a notification
      window.location.href = "/auth/login"; // Adjust the route as needed
    }

    // Reject the promise with the error object
    return Promise.reject(error);
  }
);

export default axiosInstance;
