import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/auth.service";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => await signIn(username, password),
  });

  return mutation;
};
