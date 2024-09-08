import { useQuery } from "@tanstack/react-query";
import { fetchInventoryById } from "../api/inventory.service";

export const useGetInventory = (id: string) => {
  const query = useQuery({
    queryKey: ["inventories", id],
    queryFn: async () => await fetchInventoryById(id),
  });

  return query;
};
