import { useMutation } from "@tanstack/react-query";
import { create } from "../api/inventory.service";
import { InventorySchemaType } from "../schema/inventory-schema";

export const useCreateItem = () => {
  const mutation = useMutation({
    mutationFn: async (data: InventorySchemaType) => await create(data),
  });

  return mutation;
};
