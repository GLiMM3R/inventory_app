import React, { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  Input,
  Label,
  Spinner,
  Text,
  XStack,
  YStack,
} from "tamagui";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Calendar, DollarSign } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

const priceFormSchema = z.object({
  effective_date: z.date(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

export type PriceFormSchema = z.infer<typeof priceFormSchema>;

type Props = {
  onSubmit: (values: PriceFormSchema) => void;
  loading: boolean;
};

const CreatePriceForm = ({ onSubmit, loading }: Props) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    currentDate && setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceFormSchema>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      effective_date: new Date(),
      price: "0",
    },
  });

  const submit = (values: PriceFormSchema) => {
    onSubmit(values);
  };

  return (
    <Form
      alignItems="center"
      minWidth={300}
      gap={"$4"}
      onSubmit={handleSubmit(submit)}
    >
      <YStack w={"80%"}>
        <Label>Price</Label>
        <Controller
          name="price"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <XStack alignItems="center" gap={4}>
              <DollarSign color={"gray"} style={styles.currencyIcon} />
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.priceInput}
                keyboardType="numeric"
              />
            </XStack>
          )}
        />
        {errors.price && <Text color={"red"}>{errors.price.message}</Text>}
        <Label>Effective Date</Label>
        <Controller
          name="effective_date"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <XStack alignItems="center" gap={4}>
              <TouchableOpacity
                onPress={() => showMode("date")}
                style={styles.calendarIcon}
              >
                <Calendar color={"gray"} />
              </TouchableOpacity>
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={dayjs(date).format("DD/MM/YYYY")}
                style={styles.dateInput}
              />
            </XStack>
          )}
        />
        {errors.effective_date && (
          <Text color={"red"}>{errors.effective_date.message}</Text>
        )}
      </YStack>
      <Form.Trigger asChild disabled={loading}>
        <Button theme={"blue"} icon={loading ? <Spinner /> : undefined}>
          Save
        </Button>
      </Form.Trigger>
    </Form>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    paddingHorizontal: 12,
  },
  priceInput: {
    width: "100%",
    paddingLeft: 40,
  },
  dateInput: {
    width: "100%",
  },
  currencyIcon: {
    position: "absolute",
    left: 10,
    zIndex: 10,
  },
  calendarIcon: {
    position: "absolute",
    right: 10,
    zIndex: 10,
  },
});

export default CreatePriceForm;
