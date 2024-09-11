import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCreateItem } from "~/features/inventory/mutation/use-create-item";
import ProductForm, {
  ProductFormSchema,
} from "~/components/product/ProductForm";

const Form = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [loading, setLoading] = useState(false);
  const mutation = useCreateItem();

  const onSubmit = (values: ProductFormSchema) => {
    setLoading(true);
    mutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        router.push("/(tabs)/(items)");
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
