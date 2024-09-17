import axios from "@/libs/request";
import { Inventory } from "../model/inventory";
import { Response } from "@/types/reponse";
import { InventorySchemaType } from "../schema/inventory-schema";

type Props = {
  pageParam: number;
};

export const fetchInventories = async ({ pageParam }: Props) => {
  try {
    const { data } = await axios.get<Response<Inventory[]>>(`/inventories`, {
      params: {
        page: pageParam,
      },
    });

    return data.data ?? [];
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

export const create = async (data: InventorySchemaType) => {
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

export const update = async (id: string, data: InventorySchemaType) => {
  try {
    await axios.patch(`/inventories/${id}`, {
      name: data.name,
      price: Number(data.price),
      quantity: Number(data.quantity),
    });
  } catch (error) {
    throw new Error("Update item failed");
  }
};
