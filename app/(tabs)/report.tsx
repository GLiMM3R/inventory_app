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

const SaleListing = () => {
  return (
    <SafeAreaView>
      <ScrollView padding={8}>
        <Link href={"/(report)/"} asChild>
          <Card
            size="$4"
            bordered
            flexBasis={"auto"}
            height={100}
            overflow="hidden"
            borderRadius={8}
          >
            <Card.Header padded>
              <H4>Sales</H4>
              <Paragraph theme="alt2"></Paragraph>
            </Card.Header>
            <Card.Footer padded>
              <XStack flex={1} />
              <Button
                borderRadius="$10"
                animation="bouncy"
                scale={1}
                pressStyle={{ scale: 1.03 }}
                theme={"blue"}
              >
                View
              </Button>
            </Card.Footer>
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

export default SaleListing;
