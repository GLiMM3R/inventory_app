import axios from "@/libs/request";
import { Inventory } from "../model/inventory";
import { Response } from "@/types/reponse";
import { ItemFormSchema } from "~/app/items/_components/CreateItemForm";

export const fetchInventories = async (filters: any) => {
  try {
    const response = await axios.get<Response<Inventory[]>>(`/inventories`, {
      params: filters,
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch inventories");
  }
};

export const fetchInventoryById = async (id: string) => {
  try {
    const response = await axios.get<Response<Inventory>>(`/inventories/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch inventory");
  }
};

export const create = async (data: ItemFormSchema) => {
  try {
    await axios.post(`/inventories`, {
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  } catch (error) {
    throw new Error("Create item failed");
  }
};
