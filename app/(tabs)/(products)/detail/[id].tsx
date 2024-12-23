import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import {
  Href,
  Link,
  router,
  Stack,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import { Button, H4, Image, Separator, View, XStack } from "tamagui";
import { CalendarClock, Edit, History } from "lucide-react-native";
import SheetComponent from "@/components/Sheet";
import { useCreatePrice } from "~/features/price/mutation/use-create-price";
import dayjs from "dayjs";
import CreatePriceForm, {
  PriceFormSchema,
} from "~/components/product/CreatePriceForm";
import ProductForm from "~/components/product/ProductForm";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: inventory } = useGetInventory(id);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const matation = useCreatePrice();

  const onSubmit = async (values: PriceFormSchema) => {
    setLoading(true);

    matation.mutate(
      {
        inventory_id: id.toString(),
        effective_date: dayjs(values.effective_date).unix(),
        price: Number(values.price),
      },
      {
        onSuccess: () => {
          setOpen(false);
          setLoading(false);
          ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
        },
        onError: (error) => {
          setLoading(false);
          Alert.alert("Error creating price", error.message);
        },
      }
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        // <Ionicons size={310} name="code-slash" style={styles.headerImage} />
        <Image
          key={id.toString()}
          src={"https://picsum.photos/300/200"}
          width={400}
          height={260}
        />
      }
    >
      {open && (
        <SheetComponent
          open={open}
          onOpenChange={setOpen}
          snapPoints={[300]}
          snapPointsMode="constant"
        >
          <CreatePriceForm onSubmit={onSubmit} loading={loading} />
        </SheetComponent>
      )}
      {openEdit && (
        <SheetComponent
          open={openEdit}
          onOpenChange={setOpenEdit}
          snapPoints={[400]}
          snapPointsMode="constant"
        >
          <ProductForm onSubmit={() => {}} data={inventory} loading />
        </SheetComponent>
      )}
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

export default Detail;
