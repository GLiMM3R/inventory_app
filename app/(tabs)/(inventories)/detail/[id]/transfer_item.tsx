import { View } from "react-native";
import React, { useState } from "react";
import TransferForm from "~/components/product/TransferForm";
import { TransferItemSchemaType } from "~/features/transfer-item/schema/transfer-item-schema";
import { useTransferItem } from "~/features/transfer-item/mutation/use-transfer-item";
import { router, useLocalSearchParams } from "expo-router";

const TransferItem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const muatation = useTransferItem();
  const [loading, setLoading] = useState(false);

  const onSubmit = (values: TransferItemSchemaType) => {
    if (values) {
      setLoading(true);
      muatation.mutate(
        {
          inventory_id: id,
          to_branch_id: values.to_branch_id,
          quantity: Number(values.quantity),
        },
        {
          onSuccess: () => {
            setLoading(false);
            router.push("/(tabs)/(inventories)/");
            alert("Transfer successful!");
          },
          onError: (error) => {
            setLoading(false);
            alert(`Transfer failed: ${error.message}`);
          },
        }
      );
    }
  };
  return (
    <View>
      <TransferForm onSubmit={onSubmit} loading={loading} />
    </View>
  );
};

export default TransferItem;
