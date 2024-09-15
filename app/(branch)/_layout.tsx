import React from "react";
import { Stack } from "expo-router";

const BranchLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Branch", headerShown: true }}
      />
    </Stack>
  );
};

export default BranchLayout;
