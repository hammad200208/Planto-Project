import React, { createContext, useState, useContext } from 'react';

// 1. Create Context
export const CartContext = createContext();

// 2. Custom Hook
export const useCart = () => useContext(CartContext);

// 3. Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Use _id for identification consistently
      const existing = prevItems.find(item => item._id === product._id);
      if (existing) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, getTotalQuantity, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
