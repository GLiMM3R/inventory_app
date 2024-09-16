import axios from "@/libs/request";
import { TransferItemDto } from "../dto/transfer-item.dto";
import { Response } from "~/types/reponse";
import { InventoryTransfer } from "../model/inventory-transfer";

type Props = {
  pageParam: number;
  startDate: string;
  endDate: string;
};

export const transferItem = async (data: TransferItemDto) => {
  await axios.post("/inventory_transfers", data);
};

export const fetchInventoryTransfers = async ({
  pageParam,
  startDate,
  endDate,
}: Props) => {
  const { data } = await axios.get<Response<InventoryTransfer[]>>(
    "/inventory_transfers",
    {
      params: { start_date: startDate, end_date: endDate, page: pageParam },
    }
  );

  return data.data ?? [];
};
