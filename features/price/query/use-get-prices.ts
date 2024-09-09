import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPrices } from "../api/price.service";

type Props = {
  inventory_id: string;
  page: number;
};

export const useGetPrices = (inventory_id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["prices", inventory_id],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchPrices({
        inventory_id,
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
