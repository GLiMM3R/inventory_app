import React, { useEffect } from "react";
import { Text, StyleSheet, FlatList, SectionList } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import { Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import {
  Button,
  H4,
  ListItem,
  ScrollView,
  Separator,
  View,
  XGroup,
} from "tamagui";
import { useGetPrices } from "~/features/price/query/use-get-prices";
import dayjs from "dayjs";

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: inventory } = useGetInventory(id.toString());

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <Stack.Screen options={{ title: "" }} />
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
        w={"100%"}
      >
        <XGroup>
          <Button>Move</Button>
          <Button>Add</Button>
          <Button onPress={() => router.push(`/items/price/${id}`)}>
            Price
          </Button>
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
