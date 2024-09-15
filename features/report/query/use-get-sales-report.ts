import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchSalesReport } from "../api/report.service";

type Props = {
  startDate: string;
  endDate: string;
};

export const useGetSalesReport = ({ startDate, endDate }: Props) => {
  const query = useInfiniteQuery({
    queryKey: ["sales"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchSalesReport({
        pageParam,
        startDate,
        endDate,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
