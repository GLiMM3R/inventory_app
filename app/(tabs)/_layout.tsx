import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthContext } from "~/providers/auth-provider";
import { Button, XStack } from "tamagui";
import { ScanBarcode } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.replace("/(auth)/sign-in");
      router.canDismiss();
    }
  }, [isAuthenticated, loading, router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(items)"
        options={{
          title: "Items",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cube" : "cube-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sale"
        options={{
          title: "Sale",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
          headerRight: () => (
            <XStack mr={8}>
              <Button icon={<ScanBarcode size={24} />} size={"$2"} chromeless />
            </XStack>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "log-out" : "log-out-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
