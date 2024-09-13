import React from "react";
import { Slot, Stack } from "expo-router";

const ItemsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{ title: "Edit product", headerShown: true }}
      />
      <Stack.Screen
        name="create"
        options={{ title: "Create new product", headerShown: true }}
      />
    </Stack>
  );
};

export default ItemsLayout;
