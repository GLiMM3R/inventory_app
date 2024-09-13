import React from "react";
import { Stack } from "expo-router";

const ProductsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Products",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail"
        options={{ title: "Product Detail", headerShown: true }}
      />
    </Stack>
  );
};

export default ProductsLayout;
