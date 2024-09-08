import axios from "@/libs/request";
import { Auth } from "../model/auth";
import { Response } from "@/types/reponse";
import * as SecureStorage from "expo-secure-store";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post<Response<Auth>>(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      { username, password }
    );

    return response.data.data;
  } catch (error) {
    throw new Error("Username or password incorrect");
  }
};

export const logout = async () => {
  try {
    const refresh_token = await SecureStorage.getItemAsync("refresh_token");

    if (!refresh_token) {
      throw new Error("No session found");
    }

    await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/logout`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );

    await SecureStorage.deleteItemAsync("session");
  } catch (error) {
    throw new Error("Failed to logout");
  }
};
