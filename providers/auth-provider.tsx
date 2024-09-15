import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { useLogin } from "~/features/auth/mutation/use-login";
import { useLogout } from "~/features/auth/mutation/use-logout";
import * as SecureStorage from "expo-secure-store";
import { User } from "~/features/auth/model/auth";
import { useSendOTP } from "~/features/auth/mutation/use-send-otp";

type Props = {
  children: React.ReactNode;
};

interface AuthContextProps {
  user?: User | null;
  setUser?: (user: User | null) => void;
  onLogin?: ({
    username,
    password,
    otp,
  }: {
    username: string;
    password: string;
    otp: string;
  }) => Promise<void>;
  onLogout?: () => Promise<void>;
  onSendOTP?: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextProps>({});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutationLogin = useLogin();
  const mutationLogout = useLogout();
  const mutationOTP = useSendOTP();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const user = await SecureStorage.getItemAsync("user");
      const refresh_token = await SecureStorage.getItemAsync("refresh_token");
      console.log("🚀 ~ checkAuth ~ user:", user);
      console.log("🚀 ~ checkAuth ~ refresh_token:", refresh_token);

      if (user && refresh_token) {
        setUser(JSON.parse(user));
        router.replace("/(tabs)/(products)/");
        router.canGoBack();
      } else {
        setUser(null);
      }
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      Alert.alert("Credentials failed");
    }
  };

  const onLogin = async ({
    username,
    password,
    otp,
  }: {
    username: string;
    password: string;
    otp: string;
  }) => {
    setIsLoading(true);
    mutationLogin.mutate(
      { username, password, otp },
      {
        onSuccess: async (data) => {
          if (data) {
            setUser(data);
            router.replace("/(tabs)/(products)/");
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const onSendOTP = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    mutationOTP.mutate(
      { username: username },
      {
        onSuccess: () => {
          setIsLoading(false);
          router.push({
            pathname: "/(auth)/otp",
            params: {
              username,
              password,
            },
          });
        },
        onError: (error) => {
          setIsLoading(false);
          alert(`Error sending OTP: ${error.message}`);
        },
      }
    );
  };

  const value: AuthContextProps = {
    user,
    setUser: setUser,
    onLogin,
    onLogout,
    onSendOTP,
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
