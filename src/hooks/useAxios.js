/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // add a request interceptor

    const requestIntercep = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // add a response interceptor

    // Add a response interceptor
    const responseIntercep = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;

            console.log(`New Token: ${token}`);
            setAuth({ ...auth, authToken: token });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercep);
      api.interceptors.request.eject(responseIntercep);
    };
  }, [auth.authToken]);
  return { api };
};