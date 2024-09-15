import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spinner } from "tamagui";
import { useAuthContext } from "@/providers/auth-provider";
import { LogOut } from "lucide-react-native";
import axios from "axios";
import { Response } from "~/types/reponse";
import { Auth } from "~/features/auth/model/auth";
import * as SecureStorage from "expo-secure-store";
import { router } from "expo-router";

const Settings = () => {
  const { loading, onLogout } = useAuthContext();

  const handleLogout = async () => {
    await onLogout!();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button theme={"blue"} onPress={() => router.push("/(branch)/")}>
        Go to branch
      </Button>
      <Button
        theme={"red"}
        onPress={handleLogout}
        icon={loading ? <Spinner /> : <LogOut size={24} />}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
