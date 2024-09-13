import { Link } from "expo-router";
import React from "react";
import { Button, Card, CardProps, H4, Image, Paragraph, XStack } from "tamagui";

type Props = {
  cardProps: CardProps;
  id: string;
  title: string;
  price: number;
  addToCard: () => void;
};

const ProductCard = (props: Props) => {
  return (
    <Link
      href={{
        pathname: "/(products)/detail/[id]",
        params: { id: props.id },
      }}
      asChild
    >
      <Card size="$4" bordered {...props.cardProps} overflow="hidden">
        <Card.Header padded>
          <H4>{props.title}</H4>
          <Paragraph theme="alt2">${props.price}</Paragraph>
        </Card.Header>
        <Card.Footer padded>
          <XStack flex={1} />
          <Button
            borderRadius="$10"
            onPress={props.addToCard}
            animation="bouncy"
            scale={1}
            pressStyle={{ scale: 1.03 }}
            theme={"blue"}
          >
            Add to cart
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
  );
};

export default ProductCard;
