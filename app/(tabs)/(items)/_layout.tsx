import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ItemsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="detail" options={{ headerShown: true }} />
      <Stack.Screen name="form" options={{ headerShown: true }} />
    </Stack>
  );
};

export default ItemsLayout;
