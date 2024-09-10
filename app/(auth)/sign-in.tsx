import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "~/components/auth/LoginForm";
import { useAuthContext } from "~/providers/auth-provider";

const SignIn = () => {
  const { onLogin, loading } = useAuthContext();

  const onSubmit = async (values: any) => {
    await onLogin!({
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
