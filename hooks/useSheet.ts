import { useState } from "react";

export const useSheet = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(true);

  return {
    open,
    setOpen,
    modal,
    setModal,
  };
};
