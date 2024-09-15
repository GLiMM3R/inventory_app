import axios from "@/libs/request";
import { Response } from "~/types/reponse";
import { Branch } from "../model/branch";

type Props = {
  pageParam: number;
  not_self: boolean;
};

export const fetchBranches = async ({ pageParam, not_self }: Props) => {
  const { data } = await axios.get<Response<Branch[]>>(`/branches`, {
    params: { page: pageParam, not_self },
  });

  return data.data ?? [];
};
