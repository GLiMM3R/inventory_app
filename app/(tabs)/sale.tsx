import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Button, Image, Input, ListItem, XStack, YGroup } from "tamagui";
import { ImageIcon, Plus, ScanBarcode } from "lucide-react-native";

const Sale = () => {
  const [filters, setFilters] = useState();
  const { data, refetch } = useGetInventories(filters);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <YGroup alignSelf="center" width={"100%"} size="$4">
        <FlatList
          data={data?.data ?? []}
          contentContainerStyle={{ gap: 5, padding: 5 }}
          keyExtractor={(item) => item.inventory_id}
          renderItem={({ item }) => (
            <YGroup.Item>
              <ListItem
                pressTheme
                title={item.name}
                subTitle={`Qty: ${item.quantity}`}
                icon={() => <ImageIcon size={48} color={"gray"} />}
                iconAfter={() => (
                  <Button icon={<Plus />} onPress={() => alert("added")} />
                )}
              >
                {"$" + item.price.toFixed(2)}
              </ListItem>
            </YGroup.Item>
          )}
        />
      </YGroup>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    paddingHorizontal: 16,
    gap: 8,
  },
});

export default Sale;
