import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../api/auth.service";

export const useSendOTP = () => {
  const mutation = useMutation({
    mutationFn: async ({ username }: { username: string }) =>
      await sendOTP(username),
  });

  return mutation;
};
