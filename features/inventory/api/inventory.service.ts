import axios from "@/libs/request";
import { Inventory } from "../model/inventory";
import { Response } from "@/types/reponse";

export const fetchInventories = async (filters: any) => {
  try {
    const response = await axios.get<Response<Inventory[]>>(
      `${process.env.EXPO_PUBLIC_API_URL}/inventories`,
      { params: filters }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch inventories");
  }
};
