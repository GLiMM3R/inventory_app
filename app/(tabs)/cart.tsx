import { StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ListItem, Spinner, Text, View, XStack, YStack } from "tamagui";
import {
  Delete,
  DeleteIcon,
  ImageIcon,
  Minus,
  Plus,
  Trash,
} from "lucide-react-native";
import { useCart } from "~/providers/cart-provider";
import { useCheckout } from "~/features/sale/mutation/use-checkout";
import { SaleDto } from "~/features/sale/dto/sale.dto";

const Sale = () => {
  const { items, addItem, decreaseItem, removeItem, resetItems } = useCart();
  const [loading, setLoading] = useState(false);
  const mutation = useCheckout();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const onSubmit = () => {
    setLoading(true);

    const values: SaleDto[] = [];

    for (const item of items) {
      values.push({
        inventory_id: item.id,
        quantity: item.quantity,
      });
    }

    mutation.mutate(values, {
      onSuccess: (data) => {
        setLoading(false);
        resetItems();
        Alert.alert("Checkout success!");
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View flex={1} gap={8}>
        <View flex={1}>
          <FlatList
            data={items ?? []}
            contentContainerStyle={{
              gap: 5,
              padding: 5,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListItem
                key={item.id}
                pressTheme
                borderRadius={8}
                title={item.name}
                subTitle={`Qty: ${item.quantity}`}
                icon={() => <ImageIcon size={48} color={"gray"} />}
                iconAfter={() => (
                  <XStack gap={4}>
                    <Button
                      circular
                      size={32}
                      icon={<Minus />}
                      onPress={() => decreaseItem(item.id)}
                    />
                    <Button
                      circular
                      size={32}
                      icon={<Plus />}
                      onPress={() => addItem(item)}
                    />
                    <Button
                      circular
                      size={32}
                      icon={<Trash color={"red"} />}
                      onPress={() => removeItem(item.id)}
                    />
                  </XStack>
                )}
              >
                {"$" + item.price.toFixed(2)}
              </ListItem>
            )}
            ListEmptyComponent={() => (
              <YStack flex={1} justifyContent="center">
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  No items in cart
                </Text>
              </YStack>
            )}
          />
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <Text>Total:</Text>
          <Text>${total}</Text>
        </View>
        <View my={8}>
          <Button
            icon={loading ? <Spinner /> : undefined}
            onPress={onSubmit}
            theme={items.length ? "yellow_active" : "dark_yellow"}
            disabled={items.length < 1}
          >
            Checkout
          </Button>
        </View>
      </View>
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
