import {
  StyleSheet,
  FlatList,
  RefreshControl,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Input, View, XStack } from "tamagui";
import { ScanBarcode, Search } from "lucide-react-native";
import { useCart } from "~/providers/cart-provider";
import ProductCard from "~/components/product/ProductCard";
import { debounce } from "~/libs/utils";

const Home = () => {
  const [filters, setFilters] = useState({
    status: "active",
    search: "",
  });
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useGetInventories(filters);
  const { addItem } = useCart();

  useEffect(() => {
    refetch();
  }, []);

  const handleSearchChange = debounce(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setFilters((prev) => ({ ...prev, search: e.nativeEvent.text }));
    },
    500
  );

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
          value={filters.search}
          style={styles.searchInput}
          placeholder="Search name, SKU"
          onChange={handleSearchChange}
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
