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
import { Picker } from "@react-native-picker/picker";
import { useGetBranches } from "~/features/branch/query/use-get-branches";
import { UserSchema, UserSchemaType } from "~/features/user/schema/user-schema";

type Props = {
  onSubmit: (values: UserSchemaType) => void;
  loading: boolean;
};

const UserForm = ({ onSubmit, loading }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      branch_id: "",
    },
  });
  const { data } = useGetBranches({ not_self: false });

  const submit = (values: UserSchemaType) => {
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
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
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
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
            />
          )}
        />
        <Label>Email</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
        <Label>Branch</Label>
        <Controller
          name="branch_id"
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
        {errors.branch_id && (
          <Text color={"red"}>{errors.branch_id.message}</Text>
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

export default UserForm;
