import React from "react";
import { Stack } from "expo-router";

const ReportLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Sales Report" }} />
      <Stack.Screen
        name="inventory"
        options={{ headerTitle: "Inventory Report" }}
      />
      <Stack.Screen
        name="inventory_transfer"
        options={{ headerTitle: "Inventory Transfer Report" }}
      />
    </Stack>
  );
};

export default ReportLayout;
