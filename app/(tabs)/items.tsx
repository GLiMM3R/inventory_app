import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import {
  Button,
  Image,
  Input,
  ListItem,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import {
  Filter,
  ImageIcon,
  MoreHorizontal,
  Plus,
  ScanBarcode,
  Search,
} from "lucide-react-native";
import { debounce } from "~/libs/utils";
import { Href, router } from "expo-router";

const Sale = () => {
  const [filters, setFilters] = useState("");
  const { data, refetch } = useGetInventories(filters);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <YStack flex={1} gap={16}>
        <XStack alignItems="center" gap={4}>
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
        <YGroup alignSelf="center" width={"100%"} size="$4">
          <FlatList
            data={data?.data ?? []}
            contentContainerStyle={{ gap: 6 }}
            keyExtractor={(item) => item.inventory_id}
            renderItem={({ item }) => (
              <YGroup.Item>
                <ListItem
                  pressTheme
                  title={item.name}
                  subTitle={`Qty: ${item.quantity}`}
                  icon={() => <ImageIcon size={48} color={"gray"} />}
                  onPress={() =>
                    router.push(`/items/${item.inventory_id}` as Href)
                  }
                >
                  {"$" + item.price.toFixed(2)}
                </ListItem>
              </YGroup.Item>
            )}
          />
        </YGroup>
      </YStack>
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
