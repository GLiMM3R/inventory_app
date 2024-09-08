import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Button, Image, Input, ListItem, XStack } from "tamagui";
import { ScanBarcode } from "lucide-react-native";

const Sale = () => {
  const [filters, setFilters] = useState();
  const { data, refetch } = useGetInventories(filters);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    refetch();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack alignItems="center">
        <Input flex={1} paddingLeft={44} />
        <ScanBarcode
          color={"black"}
          size={32}
          style={{ position: "absolute", left: 8 }}
        />
      </XStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    padding: 16,
  },
});

export default Sale;
