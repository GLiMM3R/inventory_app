import { SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useGetPrices } from "~/features/price/query/use-get-prices";
import { ListItem, YGroup } from "tamagui";
import dayjs from "dayjs";

const Price = () => {
  const { inventory_id } = useLocalSearchParams();
  const { data, fetchNextPage } = useGetPrices(inventory_id.toString());

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Price History",
        }}
      />
      <YGroup padding={"$2"}>
        <FlatList
          data={data?.pages.flat()}
          keyExtractor={(item) => item.price_id}
          contentContainerStyle={{ gap: 6 }}
          renderItem={({ item }) => (
            <YGroup.Item>
              <ListItem
                title={"$" + item.price.toFixed(2)}
                subTitle={
                  "Created At: " +
                  dayjs.unix(item.created_at).format("DD-MM-YYYY hh:mm:ss")
                }
              >
                {"Effective Date: " +
                  dayjs.unix(item.effective_date).format("DD-MM-YYYY hh:mm:ss")}
              </ListItem>
            </YGroup.Item>
          )}
          onEndReached={() => {
            fetchNextPage();
          }}
        />
      </YGroup>
    </SafeAreaView>
  );
};

export default Price;