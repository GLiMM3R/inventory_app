import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "~/components/auth/LoginForm";
import { LoginSchemaType } from "~/features/auth/schema/auth-schema";
import { useAuthContext } from "~/providers/auth-provider";

const SignIn = () => {
  const { onSendOTP, loading } = useAuthContext();

  const onSubmit = async (values: LoginSchemaType) => {
    onSendOTP!({
      username: values.username.trim(),
      password: values.password,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoginForm onSubmit={onSubmit} loading={loading!} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // Background color for the splash screen
    height: "100%",
    justifyContent: "center",
  },
});

export default SignIn;
