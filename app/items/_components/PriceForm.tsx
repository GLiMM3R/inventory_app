import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, Label, Spinner, Text, YStack } from "tamagui";

const priceFormSchema = z.object({
  effective_date: z.date(),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
});

export type ItemFormSchema = z.infer<typeof priceFormSchema>;

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
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      effective_date: new Date(),
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
