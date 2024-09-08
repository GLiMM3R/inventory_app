import React from "react";
import { Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import {
  Button,
  H1,
  H4,
  Input,
  Label,
  Separator,
  View,
  XGroup,
  XStack,
  YStack,
} from "tamagui";
import { ThemedText } from "~/components/ThemedText";

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { data } = useGetInventory(id.toString());

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Stack.Screen options={{ title: "" }} />
      <H4>{data?.name}</H4>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View
        flexDirection="row"
        flexWrap="wrap"
        width={"100%"}
        justifyContent="space-between"
      >
        <View flexBasis={"48%"}>
          <Text style={styles.label}>SKU:</Text>
          <Text>{data?.sku}</Text>
        </View>
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Updated at:</Text>
          <Text>
            {new Date(Number(data?.created_at) * 1000).toLocaleString()}
          </Text>
        </View>
      </View>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View flexDirection="row" width={"100%"} justifyContent="space-between">
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Qty:</Text>
          <Text>{data?.quantity}</Text>
        </View>
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Price:</Text>
          <Text>${data?.price}</Text>
        </View>
      </View>
      <View
        position="absolute"
        justifyContent="center"
        alignItems="center"
        bottom={10}
        right={16}
        w={"100%"}
      >
        <XGroup>
          <Button>Move</Button>
          <Button>Add</Button>
        </XGroup>
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
