import { useQuery } from "@tanstack/react-query";
import { fetchInventories } from "../api/inventory.service";

export const useGetInventories = (filters: any) => {
  const query = useQuery({
    queryKey: ["inventories", filters],
    queryFn: async () => await fetchInventories(filters),
  });

  return query;
};
