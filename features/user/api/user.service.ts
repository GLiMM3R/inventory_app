import axios from "@/libs/request";
import { Response } from "~/types/reponse";
import { User } from "../model/user";
import { UserDto } from "../dto/user.dto";

type Props = {
  pageParam: number;
};

export const fetchUsers = async ({ pageParam }: Props) => {
  const { data } = await axios.get<Response<User[]>>("/restricted/users", {
    params: { page: pageParam },
  });

  return data.data ?? [];
};

export const create = async (data: UserDto) => {
  await axios.post<Response<{ message: string }>>("/users", data);
};
