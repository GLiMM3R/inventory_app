import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBranches } from "../api/branch.service";

type Props = {
  not_self?: boolean;
};

export const useGetBranches = ({ not_self }: Props) => {
  const query = useInfiniteQuery({
    queryKey: ["sales"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchBranches({
        pageParam,
        not_self: not_self ?? false,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
