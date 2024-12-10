import axios, { AxiosInstance } from 'axios';

// Extended in AuthProvider.tsx
export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000, // 10 sec
  withCredentials: true,
});

export default api;
