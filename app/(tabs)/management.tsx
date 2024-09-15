import { SafeAreaView } from "react-native";
import React from "react";
import {
  Button,
  Card,
  H4,
  Image,
  Paragraph,
  ScrollView,
  XStack,
} from "tamagui";
import { Link } from "expo-router";

const Management = () => {
  return (
    <SafeAreaView>
      <ScrollView padding={8} gap={8}>
        <Link href={"/(inventories)/"} asChild>
          <Card
            size="$4"
            bordered
            flexBasis={"auto"}
            height={100}
            overflow="hidden"
            borderRadius={8}
          >
            <Card.Header padded>
              <H4>Inventories</H4>
              <Paragraph theme="alt2"></Paragraph>
            </Card.Header>
            <Card.Background overflow="hidden">
              <Image
                objectFit="cover"
                source={require("@/assets/images/mock.jpg")}
                width={"100%"}
                height={"100%"}
              />
            </Card.Background>
          </Card>
        </Link>
        <Link href={"/(users)/"} asChild>
          <Card
            size="$4"
            bordered
            flexBasis={"auto"}
            height={100}
            overflow="hidden"
            borderRadius={8}
          >
            <Card.Header padded>
              <H4>Users</H4>
              <Paragraph theme="alt2"></Paragraph>
            </Card.Header>
            <Card.Background overflow="hidden">
              <Image
                objectFit="cover"
                source={require("@/assets/images/mock.jpg")}
                width={"100%"}
                height={"100%"}
              />
            </Card.Background>
          </Card>
        </Link>
        <Link href={"/(branch)/"} asChild>
          <Card
            size="$4"
            bordered
            flexBasis={"auto"}
            height={100}
            overflow="hidden"
            borderRadius={8}
          >
            <Card.Header padded>
              <H4>Branches</H4>
              <Paragraph theme="alt2"></Paragraph>
            </Card.Header>
            <Card.Background overflow="hidden">
              <Image
                objectFit="cover"
                source={require("@/assets/images/mock.jpg")}
                width={"100%"}
                height={"100%"}
              />
            </Card.Background>
          </Card>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Management;
