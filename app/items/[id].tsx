import React, { useState } from "react";
import { Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import { Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import { Button, H4, Separator, View, XGroup, XStack } from "tamagui";
import { Edit, History } from "lucide-react-native";
import SheetComponent from "~/components/Sheet";

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: inventory } = useGetInventory(id.toString());
  const [open, setOpen] = useState(false);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Stack.Screen
        options={{
          title: "Product detail",
          headerRight: () => (
            <XStack gap={8}>
              <TouchableOpacity
                onPress={() => router.push(`/items/price/${id}`)}
              >
                <History color={"black"} />
              </TouchableOpacity>
            </XStack>
          ),
        }}
      />
      {open && (
        <SheetComponent open={open} onOpenChange={setOpen}>
          <Text>Test</Text>
        </SheetComponent>
      )}
      <H4>{inventory?.name}</H4>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View
        flexDirection="row"
        flexWrap="wrap"
        width={"100%"}
        justifyContent="space-between"
      >
        <View flexBasis={"48%"}>
          <Text style={styles.label}>SKU:</Text>
          <Text>{inventory?.sku}</Text>
        </View>
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Updated at:</Text>
          <Text>
            {new Date(Number(inventory?.created_at) * 1000).toLocaleString()}
          </Text>
        </View>
      </View>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View flexDirection="row" width={"100%"} justifyContent="space-between">
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Qty:</Text>
          <Text>{inventory?.quantity}</Text>
        </View>
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Price:</Text>
          <Text>${inventory?.price}</Text>
        </View>
      </View>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View
        position="absolute"
        justifyContent="center"
        alignItems="center"
        bottom={10}
        right={16}
      >
        <Button
          circular
          size={"$5"}
          theme={"blue"}
          onPress={() => setOpen(true)}
        >
          <Edit color={"black"} />
        </Button>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    color: "gray",
  },
});

export default ItemDetail;
