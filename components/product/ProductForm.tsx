import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Label, Spinner, Text, YStack } from "tamagui";
import { Inventory } from "~/features/inventory/model/inventory";
import {
  InventorySchema,
  InventorySchemaType,
} from "~/features/inventory/schema/inventory-schema";

type Props = {
  onSubmit: (values: InventorySchemaType) => void;
  loading: boolean;
  data?: Inventory;
};

const ProductForm = ({ onSubmit, loading, data }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InventorySchemaType>({
    resolver: zodResolver(InventorySchema),
    defaultValues: {
      name: data?.name ?? "",
      quantity: data?.quantity.toString() ?? "0",
      price: data?.price.toString() ?? "0",
    },
  });

  const submit = (values: InventorySchemaType) => {
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
        <Label>Product Name</Label>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Product A..."}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text color={"red"}>{errors.name.message}</Text>}
        <Label>Price</Label>
        <Controller
          name="price"
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
        {errors.price && <Text color={"red"}>{errors.price.message}</Text>}
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

export default ProductForm;
