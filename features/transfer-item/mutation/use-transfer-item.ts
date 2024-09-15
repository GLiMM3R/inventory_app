import { useMutation } from "@tanstack/react-query";
import { TransferItemDto } from "../dto/transfer-item.dto";
import { transferItem } from "../api/transfer-item.service";

export const useTransferItem = () => {
  const mutation = useMutation({
    mutationFn: async (data: TransferItemDto) => await transferItem(data),
  });

  return mutation;
};
