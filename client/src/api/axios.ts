import axios, { AxiosInstance } from 'axios';

const baseURL =
  (import.meta.env.REACT_APP_API_URL as string) || 'http://localhost:3000';

// Extended in AuthProvider.tsx
export const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000, // 5 sec
  withCredentials: true,
});

export default api;
