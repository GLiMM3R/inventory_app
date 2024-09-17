import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchInventories } from "../api/inventory.service";

export const useGetInventories = (filters: any) => {
  const query = useInfiniteQuery({
    queryKey: ["inventories", filters],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchInventories({ pageParam, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
