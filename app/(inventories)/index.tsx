import { StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import {
  H6,
  Image,
  Input,
  ListItem,
  Spinner,
  Square,
  Text,
  View,
  XStack,
} from "tamagui";
import { ScanBarcode, Search } from "lucide-react-native";
import { Link } from "expo-router";

const Inventories = () => {
  const [filters, setFilters] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, isLoading, fetchNextPage } =
    useGetInventories(filters);

  useEffect(() => {
    refetch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack alignItems="center" mb={8} mx={8}>
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
          data={data?.pages.flat() ?? []}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          keyExtractor={(item) => item.inventory_id}
          renderItem={({ item }) => (
            <Link
              key={item.inventory_id}
              href={`/(inventories)/detail/${item.inventory_id}`}
              asChild
            >
              <ListItem
                pressTheme
                title={item.name}
                subTitle={`Qty: ${item.quantity}`}
                icon={() => (
                  <View
                    width={64}
                    height={64}
                    borderRadius={8}
                    overflow="hidden"
                  >
                    <Image
                      objectFit="cover"
                      source={require("@/assets/images/dummy.jpg")}
                      width={"100%"}
                      height={"100%"}
                    />
                  </View>
                )}
                iconAfter={() => (
                  <H6 color="gray" fontSize={12}>
                    {item.status === "active"
                      ? "In-Stock"
                      : item.status === "sold"
                      ? "Sold Out"
                      : "Deprecated"}
                  </H6>
                )}
                borderRadius={8}
                elevation={1}
                backgroundColor={"white"}
              >
                {"$" + item.price.toFixed(2)}
              </ListItem>
            </Link>
          )}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (distanceFromEnd < 0) {
              fetchNextPage();
            }
          }}
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
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Inventories;
