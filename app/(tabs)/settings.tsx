import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spinner } from "tamagui";
import { useAuthContext } from "@/providers/auth-provider";
import { LogOut } from "lucide-react-native";

const Settings = () => {
  const { loading, onLogout } = useAuthContext();
  const handleLogout = async () => {
    console.log("pressed");

    await onLogout!();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
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
