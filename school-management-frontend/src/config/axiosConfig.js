import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000'
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage/sessionStorage
    const token = localStorage.getItem('token'); // Or use sessionStorage
    if (token) {
      // Attach the token to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., token expired)
      console.error('Unauthorized! Redirecting to login...');
      // Optionally, redirect to the login page or logout the user
      localStorage.removeItem('jwtToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
