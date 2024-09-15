import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGetSalesReport } from "~/features/report/query/use-get-sales-report";
import dayjs from "dayjs";
import { Card, H4, H5, Input, Paragraph, Spinner, View, XStack } from "tamagui";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import { debounce } from "~/libs/utils";

const SalesReport = () => {
  const currentDate = dayjs();
  const [startDate, setStartDate] = useState(
    currentDate.startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    currentDate.endOf("month").format("YYYY-MM-DD")
  );
  const { data, fetchNextPage, refetch, isLoading } = useGetSalesReport({
    startDate,
    endDate,
  });
  const [refreshing, setRefreshing] = useState(false);

  const handleSetStartDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: new Date(startDate),
      onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate;

        if (
          dayjs(currentDate)
            .startOf("day")
            .diff(dayjs(endDate).startOf("day")) > 0
        ) {
          alert("Start date cannot be after end date");
          return;
        }

        currentDate && setStartDate(dayjs(currentDate).format("YYYY-MM-DD"));
        handleChange();
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  const handleSetEndDate = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: new Date(endDate),
      onChange: (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate;

        if (
          dayjs(startDate)
            .startOf("day")
            .diff(dayjs(currentDate).startOf("day")) > 0
        ) {
          alert("End date cannot be before start date");
          return;
        }

        currentDate && setEndDate(dayjs(currentDate).format("YYYY-MM-DD"));
        handleChange();
      },
      mode: currentMode,
      is24Hour: true,
    });
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </View>
    );
  }

  const handleChange = debounce(async () => {
    await refetch();
  }, 300);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <XStack alignItems="center" gap={8} padding={8}>
        <View flex={1} justifyContent="center" flexDirection="column">
          <Input
            value={dayjs(startDate).format("DD/MM/YYYY")}
            editable={false}
            style={styles.dateInput}
          />
          <TouchableOpacity
            onPress={() => handleSetStartDate("date")}
            style={styles.calendarIcon}
          >
            <Calendar color={"gray"} />
          </TouchableOpacity>
        </View>
        <View flex={1} justifyContent="center" flexDirection="column">
          <Input
            value={dayjs(endDate).format("DD/MM/YYYY")}
            editable={false}
            style={styles.dateInput}
          />
          <TouchableOpacity
            onPress={() => handleSetEndDate("date")}
            style={styles.calendarIcon}
          >
            <Calendar color={"gray"} />
          </TouchableOpacity>
        </View>
      </XStack>

      <View flex={1}>
        <FlatList
          data={data?.pages.flat() ?? []}
          contentContainerStyle={{ gap: 8, padding: 8 }}
          keyExtractor={(item) => item.order_number}
          renderItem={({ item }) => (
            <Card key={item.order_number} theme={"blue"}>
              <Card.Header>
                <H5>{item.order_number}</H5>
                <Paragraph>Quantity: {item.total_quantity}</Paragraph>
                <Paragraph>Total: ${item.net_amount}</Paragraph>
                <Paragraph color={"gray"}>
                  {dayjs.unix(item.sale_date).format("DD-MM-YYYY hh:mm:ss")}
                </Paragraph>
              </Card.Header>
            </Card>
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

export default SalesReport;
