import React, { useEffect, useLayoutEffect } from 'react';
import api from '../api/axios';
import useAuth from '../hooks/useAuth';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

type CustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const { token, setToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to='/auth/login' replace />;

  // Fetch initial token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await api.get('/auth/refresh');
        setToken(data.token);
      } catch (error) {
        setToken(undefined);
        navigate('/auth/login', { replace: true });
      }
    };

    fetchToken();
  }, []);

  // Set token in Axios request headers
  useLayoutEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      (config: CustomInternalAxiosRequestConfig) => {
        if (token && !config._retry) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  // Refresh token on 401 errors
  useLayoutEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest =
          error.config as CustomInternalAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest?._retry) {
          try {
            const { data } = await api.get('/auth/refresh');
            setToken(data.token);

            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch (refreshError) {
            setToken(undefined);
            navigate('/auth/login', { replace: true });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  return <>{children}</>;
};

export default ProtectedPage;
