import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  Input,
  Label,
  Spinner,
  Text,
  View,
  YStack,
} from "tamagui";
import {
  TransferItemSchema,
  TransferItemSchemaType,
} from "~/features/transfer-item/schema/transfer-item-schema";
import { Picker } from "@react-native-picker/picker";
import { useGetBranches } from "~/features/branch/query/use-get-branches";

type Props = {
  onSubmit: (values: TransferItemSchemaType) => void;
  loading: boolean;
};

const TransferForm = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferItemSchemaType>({
    resolver: zodResolver(TransferItemSchema),
    defaultValues: {
      to_branch_id: "",
      quantity: "0",
    },
  });
  const { data } = useGetBranches({ not_self: true });

  const submit = (values: TransferItemSchemaType) => {
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
        <Label>Branch</Label>
        <Controller
          name="to_branch_id"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              backgroundColor={"$background075"}
              height={44}
              borderRadius={8}
              justifyContent="center"
            >
              <Picker
                selectedValue={value}
                onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
              >
                {data?.pages.flat() &&
                  data?.pages
                    .flat()
                    .map((item) => (
                      <Picker.Item
                        key={item.branch_id}
                        label={item.name}
                        value={item.branch_id}
                      />
                    ))}
              </Picker>
            </View>
          )}
        />
        {errors.to_branch_id && (
          <Text color={"red"}>{errors.to_branch_id.message}</Text>
        )}
        <Label>Quantity</Label>
        <Controller
          name="quantity"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
        {errors.quantity && (
          <Text color={"red"}>{errors.quantity.message}</Text>
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

export default TransferForm;
