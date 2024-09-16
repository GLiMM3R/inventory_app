import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPForm from "~/components/auth/OTPForm";
import { View } from "tamagui";
import { useAuthContext } from "~/providers/auth-provider";
import { useLocalSearchParams } from "expo-router";

const OTP = () => {
  const { username, password } = useLocalSearchParams<{
    username: string;
    password: string;
  }>();

  const { onLogin, loading } = useAuthContext();

  const onSubmit = (values: { otp: string }) => {
    onLogin!({ username, password, otp: values.otp });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View width={"100%"} top={20}>
        <OTPForm onSubmit={onSubmit} loading={loading!} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D2E0FB", // Background color for the splash screen
  },
});

export default OTP;
