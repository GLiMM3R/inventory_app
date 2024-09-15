import React from "react";
import { Button, Form, Input, Label, Spinner, Text, YStack } from "tamagui";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const OTPFormSchema = z.object({
  otp: z.string().min(6),
});

type Props = {
  onSubmit: (values: z.infer<typeof OTPFormSchema>) => void;
  loading: boolean;
};

const OTPForm = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const submit = (values: z.infer<typeof OTPFormSchema>) => {
    onSubmit(values);
  };

  return (
    <Form
      alignItems="center"
      minWidth={300}
      width={"100%"}
      gap={"$4"}
      onSubmit={handleSubmit(submit)}
    >
      <YStack w={"90%"}>
        <Label>OTP will send to your email</Label>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Enter your OTP"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.otp && <Text color={"red"}>{errors.otp.message}</Text>}
      </YStack>
      <Form.Trigger asChild disabled={loading}>
        <Button theme={"blue"} icon={loading ? <Spinner /> : undefined}>
          Next
        </Button>
      </Form.Trigger>
    </Form>
  );
};

export default OTPForm;
