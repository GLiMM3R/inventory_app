import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
  resetItems: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = { children: React.ReactNode };

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    const existsItem = items.find((i) => i.id === item.id);
    if (existsItem) {
      existsItem.quantity += 1;
      setItems([...items]);
    } else {
      setItems([...items, item]);
    }
  };

  const decreaseItem = (id: string) => {
    const existsItem = items.find((i) => i.id === id);
    if (existsItem && existsItem.quantity > 1) {
      existsItem.quantity -= 1;
      setItems([...items]);
    } else if (existsItem && existsItem.quantity === 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const resetItems = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, decreaseItem, resetItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
