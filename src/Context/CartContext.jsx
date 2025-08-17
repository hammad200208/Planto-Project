import React, { createContext, useState, useContext, useEffect } from "react";

// 1 Create Context
export const CartContext = createContext();

// 2 Custom Hook
export const useCart = () => useContext(CartContext);

// 3 Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  //  Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart) ?? []);
      } catch {
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  //  Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems ?? []));
  }, [cartItems]);

  //  Add product to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems?.find((item) => item?._id === product?._id);
      if (existing) {
        return prevItems.map((item) =>
          item?._id === product?._id
            ? { ...item, quantity: (item?.quantity ?? 0) + 1 }
            : item
        );
      } else {
        return [...(prevItems ?? []), { ...product, quantity: 1 }];
      }
    });
  };

  //  Get total quantity in cart
  const getTotalQuantity = () =>
    cartItems?.reduce((total, item) => total + (item?.quantity ?? 0), 0) ?? 0;

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, getTotalQuantity, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
