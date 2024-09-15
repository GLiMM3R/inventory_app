import React from "react";
import { Stack } from "expo-router";

const ReportLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Sales Report" }} />
    </Stack>
  );
};

export default ReportLayout;
