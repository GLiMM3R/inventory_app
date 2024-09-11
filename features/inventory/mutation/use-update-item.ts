import { useMutation } from "@tanstack/react-query";
import { update } from "../api/inventory.service";
import { InventorySchemaType } from "../schema/inventory-schema";

export const useUpdateItem = () => {
  const mutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: InventorySchemaType;
    }) => await update(id, data),
  });

  return mutation;
};
