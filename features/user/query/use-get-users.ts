import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/user.service";

export const useGetUsers = () => {
  const query = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: async ({ pageParam = 1 }) =>
      await fetchUsers({
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  return query;
};
