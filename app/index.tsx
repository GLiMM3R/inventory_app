import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Href, Link, router } from "expo-router";
import { Button, Text, View } from "tamagui";

const App = () => {
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#D2E0FB" }}>
      <View flex={1} justifyContent="center" alignItems="center" rowGap={"$4"}>
        <Text fontSize={24}>Welcome</Text>
        <Button
          theme={"blue_active"}
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default App;
