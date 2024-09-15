import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { XStack } from "tamagui";
import { PlusCircleIcon } from "lucide-react-native";

const UsersLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Users",
          headerRight: () => (
            <XStack mr={8} justifyContent="flex-end">
              <TouchableOpacity onPress={() => router.push("/(users)/create")}>
                <PlusCircleIcon color={"black"} />
              </TouchableOpacity>
            </XStack>
          ),
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "User Detail" }} />
    </Stack>
  );
};

export default UsersLayout;
