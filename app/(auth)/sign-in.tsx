import { Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "~/components/auth/LoginForm";
import axios from "axios";
import { Text } from "tamagui";

const SignIn = () => {
  const onSubmit = async (values: any) => {
    try {
      const response = await axios.post("http://192.168.1.10:3001/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        Alert.alert("Login Successful", response.data.messages);
      }
    } catch (error) {
      Alert.alert("Login Successful", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoginForm onSubmit={onSubmit} />
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
