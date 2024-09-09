import { Edit } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Sheet } from "tamagui";

type Props = {
  children?: React.ReactNode;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const SheetComponent = ({ children, open, onOpenChange }: Props) => {
  const [position, setPosition] = useState(0);
  const [modal, setModal] = useState(true);

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={onOpenChange}
        snapPoints={[50]}
        snapPointsMode={"percent"}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
        animation="medium"
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle />
        <Sheet.Frame padding="$4">{children}</Sheet.Frame>
      </Sheet>
    </>
  );
};

export default SheetComponent;
