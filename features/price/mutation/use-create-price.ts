import { useMutation } from "@tanstack/react-query";
import { createPrice } from "../api/price.service";
import { PriceCreateDto } from "../model/price.dto";

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (data: PriceCreateDto) => await createPrice(data),
  });

  return mutation;
};
