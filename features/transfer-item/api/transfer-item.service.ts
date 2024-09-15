import axios from "@/libs/request";
import { TransferItemDto } from "../dto/transfer-item.dto";

export const transferItem = async (data: TransferItemDto) => {
  await axios.post("inventory_transfers", data);
};
