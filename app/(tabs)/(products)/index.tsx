import { StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Button, Input, ListItem, View, XStack, YStack } from "tamagui";
import {
  ImageIcon,
  PlusCircle,
  Scale,
  ScanBarcode,
  Search,
} from "lucide-react-native";
import { Link } from "expo-router";
import { useCart } from "~/providers/cart-provider";
import ProductCard from "~/components/product/ProductCard";

const Home = () => {
  const [filters, setFilters] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useGetInventories(filters);
  const { addItem } = useCart();

  useEffect(() => {
    refetch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack alignItems="center" my={8} mx={8}>
        <Search color={"gray"} style={styles.searchIcon} />
        <ScanBarcode color={"gray"} style={styles.barcodeIcon} />
        <Input
          flex={1}
          value={filters}
          style={styles.searchInput}
          placeholder="Search name, SKU"
          onChange={() => {}}
        />
      </XStack>
      <View flex={1}>
        <FlatList
          data={data?.data ?? []}
          numColumns={2}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          columnWrapperStyle={{ gap: 8 }}
          keyExtractor={(item) => item.inventory_id}
          renderItem={({ item }) => (
            <ProductCard
              id={item.inventory_id}
              title={item.name}
              price={item.price}
              cardProps={{
                size: "$5",
                height: 250,
                flex: 0.5,
                elevation: 0,
                animation: "bouncy",
                scale: 1,
                pressStyle: { scale: 1.03 },
              }}
              addToCard={() =>
                addItem({
                  id: item.inventory_id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                })
              }
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    // paddingHorizontal: 12,
  },
  searchInput: {
    paddingLeft: 40,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
  barcodeIcon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
});

export default Home;
