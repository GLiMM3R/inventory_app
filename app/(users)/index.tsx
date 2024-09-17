import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  ListItem,
  Spinner,
  Text,
  View,
  XStack,
} from "tamagui";
import { useGetUsers } from "~/features/user/query/use-get-users";
import dayjs from "dayjs";
import { Search } from "lucide-react-native";
import { router } from "expo-router";

const Users = () => {
  const { data, refetch, fetchNextPage, isLoading } = useGetUsers();
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState();

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </View>
    );
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack alignItems="center" mt={8} mx={8}>
        <Search color={"gray"} style={styles.searchIcon} />
        <Input
          flex={1}
          value={filters}
          style={styles.searchInput}
          placeholder="Search name"
          onChange={() => {}}
        />
      </XStack>
      <View flex={1}>
        <FlatList
          data={data?.pages.flat() ?? []}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <ListItem
              key={item.user_id}
              icon={() => (
                <Avatar circular size="$5">
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                  />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
              )}
              theme={"blue"}
              borderRadius={8}
              elevation={1}
              title={item.username}
              subTitle={dayjs
                .unix(item.updated_at)
                .format("YYYY-MM-DD hh:mm:ss")}
              onPress={() => router.push(`/${item.user_id}`)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={{ textAlign: "center", padding: 16 }}>
              No sales data available for the selected date range.
            </Text>
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
  },
  searchInput: {
    paddingLeft: 40,
  },
  searchIcon: {
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
});
export default Users;
