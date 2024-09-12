import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { useGetSales } from "~/features/sale/query/use-get-sales";
import { ListItem } from "tamagui";
import dayjs from "dayjs";

const SaleListing = () => {
  const { data, fetchNextPage } = useGetSales();
  return (
    <SafeAreaView>
      <FlatList
        data={data?.pages.flat()}
        contentContainerStyle={{ gap: 8, padding: 6 }}
        keyExtractor={(item) => item.sale_id}
        renderItem={({ item }) => (
          <ListItem
            title={item.sale_id}
            subTitle={dayjs.unix(item.created_at).format("DD-MM-YYYY hh:mm:ss")}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default SaleListing;
