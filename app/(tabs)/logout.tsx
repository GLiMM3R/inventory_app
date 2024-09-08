import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetInventories } from "~/features/inventory/query/use-get-inventories";
import { Button, Spinner } from "tamagui";
import axios from "@/libs/request";
import { useLogout } from "~/features/auth/mutation/use-logout";
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
