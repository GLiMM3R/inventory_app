import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.service";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => await login(username, password),
  });

  return mutation;
};
