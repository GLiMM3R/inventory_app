import React from "react";
import { Slot, Stack } from "expo-router";

const ItemsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="price_history" options={{ headerShown: true }} />
      <Stack.Screen
        name="transfer_item"
        options={{ title: "Transfer Item", headerShown: true }}
      />
    </Stack>
  );
};

export default ItemsLayout;
