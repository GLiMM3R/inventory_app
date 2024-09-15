import { useMutation } from "@tanstack/react-query";
import { create } from "../api/user.service";
import { UserDto } from "../dto/user.dto";

export const useCreateUser = () => {
  const mutation = useMutation({
    mutationFn: async (data: UserDto) => await create(data),
  });

  return mutation;
};
