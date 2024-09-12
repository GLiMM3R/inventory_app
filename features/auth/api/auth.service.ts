import axios from "@/libs/request";
import { Auth } from "../model/auth";
import { Response } from "@/types/reponse";
import * as SecureStorage from "expo-secure-store";

export const signIn = async (username: string, password: string) => {
  try {
    const { data } = await axios.post<Response<Auth>>(`/auth/login`, {
      username,
      password,
    });

    await SecureStorage.setItemAsync("access_token", data.data.access_token);
    await SecureStorage.setItemAsync("refresh_token", data.data.refresh_token);
    await SecureStorage.setItemAsync("user", JSON.stringify(data.data.user));

    return data.data.user;
  } catch (error) {
    throw new Error("Username or password incorrect");
  }
};

export const signOut = async () => {
  const refresh_token = await SecureStorage.getItemAsync("refresh_token");

  const response = await axios.post<Response<{ message: "success" }>>(
    "/auth/logout",
    undefined,
    {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to log out");
  }

  await SecureStorage.deleteItemAsync("access_token");
  await SecureStorage.deleteItemAsync("refresh_token");
  await SecureStorage.deleteItemAsync("user");
};
