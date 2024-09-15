import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/auth.service";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
      otp,
    }: {
      username: string;
      password: string;
      otp: string;
    }) => await signIn(username, password, otp),
  });

  return mutation;
};
