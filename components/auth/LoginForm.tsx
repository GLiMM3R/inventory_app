import React from "react";
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
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" }),
  password: z.string().min(5, { message: "Password lenght must more than 5!" }),
});

type Props = {
  onSubmit: (values: z.infer<typeof LoginFormSchema>) => void;
  loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submit = (values: z.infer<typeof LoginFormSchema>) => {
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
        <Label>Username</Label>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={"Enter your username"}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && (
          <Text color={"red"}>{errors.username.message}</Text>
        )}
        <Label>Password</Label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              textContentType="password"
              placeholder="Enter your password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text color={"red"}>{errors.password.message}</Text>
        )}
      </YStack>
      <Form.Trigger asChild disabled={loading}>
        <Button theme={"blue"} icon={loading ? <Spinner /> : undefined}>
          Login
        </Button>
      </Form.Trigger>
    </Form>
  );
};

export default LoginForm;
