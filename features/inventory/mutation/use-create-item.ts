import { useMutation } from "@tanstack/react-query";
import { ItemFormSchema } from "~/app/items/_components/CreateItemForm";
import { create } from "../api/inventory.service";

export const useCreateItem = () => {
  const mutation = useMutation({
    mutationFn: async (data: ItemFormSchema) => await create(data),
  });

  return mutation;
};
