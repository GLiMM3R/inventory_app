import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spinner } from "tamagui";
import { useAuthContext } from "~/providers/auth-provider";

const Sale = () => {
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
      </View>
    </SafeAreaView>
  );
};

export default Sale;
