import axios from "@/libs/request";
import { SaleDto } from "../dto/sale.dto";
import { Response } from "~/types/reponse";
import { Sale } from "../model/sale";

type Props = {
  pageParam: number;
};

export const fetchSales = async ({ pageParam }: Props) => {
  const response = await axios.get<Response<Sale[]>>("/sales", {
    params: {
      page: pageParam,
    },
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch sales");
  }

  return response.data.data;
};

export const checkout = async (data: SaleDto[]) => {
  const response = await axios.post<Response<null>>("/sales", { items: data });

  if (response.status !== 201) {
    throw new Error("Failed to checkout");
  }

  return response.data;
};
