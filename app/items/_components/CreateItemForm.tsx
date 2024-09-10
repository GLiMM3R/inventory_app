import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Label, Spinner, Text, YStack } from "tamagui";

const itemFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Quantity must be a non-negative number",
    }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;

type Props = {
  onSubmit: (values: ItemFormSchema) => void;
  loading: boolean;
};

const CreateItemForm = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemFormSchema>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      quantity: "0",
      price: "0",
    },
  });

  const submit = (values: ItemFormSchema) => {
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

export default CreateItemForm;
