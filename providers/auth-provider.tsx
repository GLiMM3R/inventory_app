import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { useLogin } from "~/features/auth/mutation/use-login";
import { useLogout } from "~/features/auth/mutation/use-logout";
import * as SecureStorage from "expo-secure-store";
import { User } from "~/features/auth/model/auth";

type Props = {
  children: React.ReactNode;
};

interface AuthContextProps {
  user?: User | null;
  setUser?: (user: User | null) => void;
  onLogin?: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  onLogout?: () => Promise<void>;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutationLogin = useLogin();
  const mutationLogout = useLogout();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const user = await SecureStorage.getItemAsync("user");
      const access_token = await SecureStorage.getItemAsync("access_token");

      if (user && access_token) {
        setUser(JSON.parse(user));
        router.replace("/(tabs)/(items)/");
        router.canGoBack();
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      Alert.alert("Credentials failed");
    }
    setIsLoading(false);
  };

  const onLogin = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    mutationLogin.mutate(
      { username, password },
      {
        onSuccess: async (data) => {
          if (data) {
            setUser(data);
            router.replace("/(tabs)/(items)/");
            router.canGoBack();
          }
          setIsLoading(false);
        },
        onError: (error) => {
          setIsLoading(false);
          Alert.alert(
            "Login failed",
            "Please check your credentials and try again."
          );
        },
      }
    );
  };

  const onLogout = async () => {
    mutationLogout.mutate(undefined, {
      onSuccess: async () => {
        setUser(null);
        router.replace("/(auth)/sign-in");
      },
      onError: (error) => {
        setUser(null);
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        router.replace("/(auth)/sign-in");
      },
    });
  };

  const value: AuthContextProps = {
    user,
    setUser: setUser,
    onLogin,
    onLogout,
    loading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;
