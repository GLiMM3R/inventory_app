import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInventoryTransfers } from "../api/transfer-item.service";

type Props = {
  startDate: string;
  endDate: string;
};

export const useGetInventoryTransfers = ({ startDate, endDate }: Props) => {
  const query = useInfiniteQuery({
    queryKey: ["inventory_transfers"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchInventoryTransfers({
        pageParam,
        startDate,
        endDate,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
