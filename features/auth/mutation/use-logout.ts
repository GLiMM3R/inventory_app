import { useMutation } from "@tanstack/react-query";
import { signOut } from "../api/auth.service";

export const useLogout = () => {
  const mutation = useMutation({
    mutationFn: async () => await signOut(),
  });

  return mutation;
};
