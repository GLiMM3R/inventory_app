import { useMutation } from "@tanstack/react-query";
import { login, logout } from "../api/auth.service";

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => await logout(),
  });

  return mutation;
};
