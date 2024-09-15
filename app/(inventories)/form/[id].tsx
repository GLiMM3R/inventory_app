import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import ProductForm from "~/components/product/ProductForm";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import { InventorySchemaType } from "~/features/inventory/schema/inventory-schema";
import { useUpdateItem } from "~/features/inventory/mutation/use-update-item";

const Form = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useGetInventory(id);

  const [loading, setLoading] = useState(false);
  const mutation = useUpdateItem();

  const onSubmit = (values: InventorySchemaType) => {
    setLoading(true);
    mutation.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          setLoading(false);
          router.push(`/(items)/detail/${id}`);
        },
        onError: (error) => {
          setLoading(false);
        },
      }
    );
  };
  return (
    <SafeAreaView>
      <View>
        <ProductForm onSubmit={onSubmit} loading={loading} data={data} />
      </View>
    </SafeAreaView>
  );
};

export default Form;
