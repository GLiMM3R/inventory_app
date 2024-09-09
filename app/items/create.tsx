import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack } from "expo-router";
import CreateItemForm, { ItemFormSchema } from "./_components/CreateItemForm";
import { useCreateItem } from "~/features/inventory/mutation/use-create-item";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const mutation = useCreateItem();

  const onSubmit = (values: ItemFormSchema) => {
    setLoading(true);
    mutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        router.push("/(tabs)/items");
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Create new item" }} />
      <View>
        <CreateItemForm onSubmit={onSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default Create;
