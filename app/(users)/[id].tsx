import React from "react";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "~/components/ParallaxScrollView";
import { Avatar, H2, Image, Separator, View } from "tamagui";

const UserDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        // <Ionicons size={310} name="code-slash" style={styles.headerImage} />
        <Image
          key={id.toString()}
          objectFit="cover"
          src={
            "https://images.unsplash.com/photo-1726059968922-0396248fdaea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={400}
          height={260}
        />
      }
    >
      <View position="absolute" top={-90} left={20}>
        <Avatar circular size="$12" elevation={2}>
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </View>
      <H2 textAlign="right">Esther</H2>
      <Separator alignSelf="stretch" marginHorizontal={0} marginVertical={4} />
    </ParallaxScrollView>
  );
};

export default UserDetail;
