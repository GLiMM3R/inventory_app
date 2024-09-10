import { Response } from "~/types/reponse";
import { PriceCreateDto } from "../model/price.dto";
import axios from "@/libs/request";
import { Price } from "../model/price";

type Props = {
  pageParam: number;
  inventory_id: string;
};

export const fetchInfinityPrices = async ({ pageParam }: Props) => {
  try {
    const response = await axios.get<Response<Price[]>>(`/prices`, {
      params: {
        page: pageParam,
      },
    });

    return response.data.data ?? [];
  } catch (error) {
    throw new Error("Failed to fetch prices");
  }
};

export const fetchPrices = async ({ pageParam, inventory_id }: Props) => {
  try {
    const response = await axios.get<Response<Price[]>>(`/prices`, {
      params: {
        inventory_id,
        page: pageParam,
      },
    });

    return response.data.data ?? [];
  } catch (error) {
    throw new Error("Failed to fetch prices");
  }
};

export const createPrice = async (data: PriceCreateDto) => {
  try {
    await axios.post("/prices", data);
  } catch (error) {
    throw new Error("Failed to create price ");
  }
};
