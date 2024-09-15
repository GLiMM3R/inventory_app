import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useCreateUser } from "~/features/user/mutation/use-create-user";
import { UserSchemaType } from "~/features/user/schema/user-schema";
import { router } from "expo-router";
import UserForm from "~/components/user/UserForm";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const mutation = useCreateUser();

  const onSubmit = (values: UserSchemaType) => {
    setLoading(true);
    mutation.mutate(values, {
      onSuccess: () => {
        setLoading(false);
        router.replace("/(users)/");
      },
      onError: (error) => {
        setLoading(false);
      },
    });
  };
  return (
    <SafeAreaView>
      <View>
        <UserForm onSubmit={onSubmit} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default Create;
