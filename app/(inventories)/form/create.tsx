import { View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useCreateItem } from "~/features/inventory/mutation/use-create-item";
import { InventorySchemaType } from "~/features/inventory/schema/inventory-schema";
import ProductForm from "~/components/product/ProductForm";
const Form = () => {
  const [loading, setLoading] = useState(false);
  const mutation = useCreateItem();

  const onSubmit = (values: InventorySchemaType) => {
    setLoading(true);
    mutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        router.push("/(items)/");
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };
  return (
    <SafeAreaView>
      <View>
        <ProductForm onSubmit={onSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default Form;
