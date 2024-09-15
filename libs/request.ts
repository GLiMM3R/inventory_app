import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { Response } from "~/types/reponse";
import { Auth } from "~/features/auth/model/auth";
import { router } from "expo-router";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
instance.interceptors.request.use(
  async (config) => {
    // You can modify the request config here
    const token = await SecureStorage.getItemAsync("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    // For example, add an auth token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStorage.getItemAsync("refresh_token");

        const { data } = await axios.get<Response<Auth>>(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken?.trim()}`,
            },
          }
        );

        originalRequest.headers.Authorization = `Bearer ${data.data?.access_token}`;

        await SecureStorage.setItemAsync(
          "access_token",
          data.data?.access_token ?? ""
        );

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Handle logout or redirect to login page
        await SecureStorage.deleteItemAsync("access_token");
        await SecureStorage.deleteItemAsync("refresh_token");
        await SecureStorage.deleteItemAsync("user");
        router.replace("/(auth)/sign-in");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
