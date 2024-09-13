import React from "react";
import { Href, Link, router, Stack } from "expo-router";
import { XStack } from "tamagui";
import { PlusCircleIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

const InventoriesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Inventory",
          headerShown: true,
          headerRight: () => (
            <XStack mr={8} justifyContent="flex-end">
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/(inventories)/form/create")}
              >
                <PlusCircleIcon color={"black"} />
              </TouchableOpacity>
            </XStack>
          ),
        }}
      />
      <Stack.Screen name="detail/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="form" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InventoriesLayout;
