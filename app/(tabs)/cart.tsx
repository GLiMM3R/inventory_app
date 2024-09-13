import { StyleSheet, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  H5,
  Image,
  ListItem,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react-native";
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
        Alert.alert(error.message);
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
          <H5>Total:</H5>
          <H5>${total}</H5>
        </View>
        <View my={16}>
          <Button
            icon={loading ? <Spinner /> : <ShoppingCart size={18} />}
            onPress={onSubmit}
            theme={items.length ? "green_active" : "dark_green"}
            disabled={items.length < 1}
          >
            CHECKOUT
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
