import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { useGetInventory } from "~/features/inventory/query/use-get-inventory";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import { Button, H4, Image, Separator, View, XStack } from "tamagui";
import {
  ArrowLeftRight,
  CalendarClock,
  Edit,
  History,
} from "lucide-react-native";
import SheetComponent from "@/components/Sheet";
import { useCreatePrice } from "~/features/price/mutation/use-create-price";
import dayjs from "dayjs";
import CreatePriceForm, {
  PriceFormSchema,
} from "~/components/product/CreatePriceForm";
import ProductForm from "~/components/product/ProductForm";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: inventory, refetch } = useGetInventory(id);
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
          src={
            "https://images.unsplash.com/photo-1726059968922-0396248fdaea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={400}
          height={260}
        />
      }
    >
      <Stack.Screen
        options={{
          title: "Product detail",
          headerShown: true,
          headerRight: () => (
            <XStack gap={12}>
              <Link
                href={{
                  pathname: "/(inventories)/detail/[id]/price_history",
                  params: { id: id },
                }}
                asChild
              >
                <TouchableOpacity>
                  <History color={"black"} />
                </TouchableOpacity>
              </Link>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <CalendarClock color={"black"} />
              </TouchableOpacity>
              <Link
                href={{
                  pathname: "/(inventories)/detail/[id]/transfer_item",
                  params: { id: id },
                }}
                asChild
              >
                <TouchableOpacity>
                  <ArrowLeftRight color={"black"} />
                </TouchableOpacity>
              </Link>
            </XStack>
          ),
        }}
      />
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
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View flexDirection="row" width={"100%"} justifyContent="space-between">
        <View flexBasis={"48%"}>
          <Text style={styles.label}>Status:</Text>
          <Text>{inventory?.status}</Text>
        </View>
      </View>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={1} />
      <View
        position="absolute"
        justifyContent="center"
        alignItems="center"
        bottom={10}
        right={16}
      >
        <Link
          href={{ pathname: "/(inventories)/form/[id]", params: { id } }}
          asChild
        >
          <Button
            circular
            size={"$5"}
            theme={"blue"}
            // onPress={() => setOpenEdit(true)}
          >
            <Edit color={"black"} />
          </Button>
        </Link>
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
