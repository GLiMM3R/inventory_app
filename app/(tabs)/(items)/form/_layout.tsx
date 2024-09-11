import React from "react";
import { Stack } from "expo-router";

const ItemsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ItemsLayout;
