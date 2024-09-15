import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useGetBranches } from "~/features/branch/query/use-get-branches";
import { Button, H4, ListItem, Text, View } from "tamagui";
import dayjs from "dayjs";
import { Link } from "expo-router";
import { Edit } from "lucide-react-native";

const Branch = () => {
  const { data, fetchNextPage, refetch } = useGetBranches({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View flex={1}>
        <FlatList
          data={data?.pages.flat()}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          keyExtractor={(item) => item.branch_id}
          renderItem={({ item }) => (
            <ListItem
              theme={"blue"}
              borderRadius={8}
              elevation={1}
              title={item.name}
              subTitle={dayjs
                .unix(item.updated_at)
                .format("YYYY-MM-DD hh:mm:ss")}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", padding: 16 }}>
              No sales data available for the selected date range.
            </Text>
          )}
          onEndReached={() => fetchNextPage()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <View
          position="absolute"
          justifyContent="center"
          alignItems="center"
          bottom={10}
          right={16}
        >
          {/* <Link
            href={{ pathname: "/(inventories)/form/[id]", params: { id } }}
            asChild
          > */}
          <Button
            circular
            size={"$5"}
            theme={"blue"}
            // onPress={() => setOpenEdit(true)}
          >
            <Edit color={"black"} />
          </Button>
          {/* </Link> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  dateInput: {
    width: "100%",
  },
  calendarIcon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
});

export default Branch;
