import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchSales } from "../api/sale.service";

type Props = {
  page: number;
};

export const useGetSales = () => {
  const query = useInfiniteQuery({
    queryKey: ["sales"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchSales({
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
