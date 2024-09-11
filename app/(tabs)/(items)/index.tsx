import { StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Input, ListItem, XStack, YStack } from "tamagui";
import {
  ImageIcon,
  PlusCircleIcon,
  ScanBarcode,
  Search,
} from "lucide-react-native";
import { Link } from "expo-router";

const Sale = () => {
  const [filters, setFilters] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useGetInventories(filters);

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
      <FlatList
        data={data?.data ?? []}
        contentContainerStyle={{ gap: 8, padding: 6 }}
        keyExtractor={(item) => item.inventory_id}
        renderItem={({ item }) => (
          <Link
            key={item.inventory_id}
            href={`/(items)/detail/${item.inventory_id}`}
            asChild
          >
            <ListItem
              pressTheme
              title={item.name}
              subTitle={`Qty: ${item.quantity}`}
              icon={() => <ImageIcon size={48} color={"gray"} />}
              borderRadius={8}
              elevation={1}
              backgroundColor={"white"}
            >
              {"$" + item.price.toFixed(2)}
            </ListItem>
          </Link>
        )}
        ListHeaderComponent={() => (
          <XStack alignItems="center" mb={8}>
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
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    paddingHorizontal: 12,
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

export default Sale;
