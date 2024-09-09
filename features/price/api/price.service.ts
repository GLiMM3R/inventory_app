import { Response } from "~/types/reponse";
import { PriceCreateDto } from "../model/price.dto";
import axios from "@/libs/request";
import { Price } from "../model/price";

type Props = {
  pageParam: number;
  inventory_id: string;
};

export const fetchInfinityPrices = async ({ pageParam }: Props) => {
  console.log("🚀 ~ fetchInfinityPrices ~ pageParam:", pageParam);
  try {
    const response = await axios.get<Response<Price[]>>(`/prices`, {
      params: {
        page: pageParam,
      },
    });

    return response.data.data ?? [];
  } catch (error) {
    throw new Error("Failed to create price ");
  }
};

export const fetchPrices = async ({ pageParam, inventory_id }: Props) => {
  console.log("🚀 ~ fetchPrices ~ inventory_id:", inventory_id);
  console.log("🚀 ~ fetchPrices ~ pageParam:", pageParam);
  try {
    const response = await axios.get<Response<Price[]>>(`/prices`, {
      params: {
        inventory_id,
        page: pageParam,
      },
    });

    return response.data.data ?? [];
  } catch (error) {
    throw new Error("Failed to create price ");
  }
};

export const createPrice = async (data: PriceCreateDto) => {
  try {
    await axios.post("/api/prices", data);
  } catch (error) {
    throw new Error("Failed to create price ");
  }
};
