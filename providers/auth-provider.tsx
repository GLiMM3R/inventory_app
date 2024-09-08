import { useRouter } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";
import { useLogin } from "~/features/auth/mutation/use-login";
import { useLogout } from "~/features/auth/mutation/use-logout";
import * as SecureStorage from "expo-secure-store";
import { Text } from "tamagui";

type Props = {
  children: React.ReactNode;
};

interface AuthContextProps {
  isAuthenticated?: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutationLogin = useLogin();
  const mutationLogout = useLogout();

  const getSession = async () => {
    const session = await SecureStorage.getItemAsync("session");
    if (session) {
      setIsAuthenticated(true);
      router.replace("/(tabs)/");
      router.canGoBack();
    }
  };

  useEffect(() => {
    getSession();
  }, []);

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
            await SecureStorage.setItemAsync("access_token", data.access_token);
            await SecureStorage.setItemAsync(
              "refresh_token",
              data.refresh_token
            );
            setIsAuthenticated(true);
            router.push("/(tabs)/");
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
        router.replace("/(auth)/sign-in");
        router.canGoBack();
      },
    });
  };

  const value: AuthContextProps = {
    isAuthenticated,
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

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // Redirect to login screen or show an unauthorized message
    return <Text>You need to be logged in to view this page.</Text>;
  }

  return <>{children}</>;
};

export default AuthProvider;
