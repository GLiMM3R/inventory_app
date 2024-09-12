import { useMutation } from "@tanstack/react-query";
import { checkout } from "../api/sale.service";
import { SaleDto } from "../dto/sale.dto";

export const useCheckout = () => {
  const mutation = useMutation({
    mutationFn: async (data: SaleDto[]) => await checkout(data),
  });

  return mutation;
};
