import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spinner } from "tamagui";
import { useAuthContext } from "~/providers/auth-provider";
import { router } from "expo-router";

const Settings = () => {
  const { loading, onLogout } = useAuthContext();
  const handleLogout = async () => {
    await onLogout!();
  };
  return (
    <SafeAreaView>
      <View>
        <Button onPress={handleLogout} icon={loading ? <Spinner /> : undefined}>
          Click
        </Button>
        <Button
          onPress={() => router.replace("/sign-in")}
          icon={loading ? <Spinner /> : undefined}
        >
          Go to sign in
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
