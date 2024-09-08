import * as secureStorage from "expo-secure-store";

export const saveStorage = async (key: string, value: string) => {
  await secureStorage.setItemAsync(key, value);
};

export const getStorage = async (key: string) => {
  const data = await secureStorage.getItemAsync(key);

  if (data) {
    return data;
  } else {
    return null;
  }
};

export const deleteStorage = async (key: string) => {
  await secureStorage.deleteItemAsync(key);
};
