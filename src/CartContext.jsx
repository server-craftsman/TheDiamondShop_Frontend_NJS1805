import React, { createContext, useState, useContext, useEffect } from "react";
import Warning from "./Warning"; // Adjust path if necessary

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [warningOpen, setWarningOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
      );
      if (existingItem) {
        // Set warning open if item is already in cart
        setWarningOpen(true);
        return prevItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }]; // Ensure quantity is 1
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const selectItemForPayment = (itemId, isSelected) => {
    setSelectedItems((prevSelected) =>
      isSelected
        ? [...prevSelected, itemId]
        : prevSelected.filter((id) => id !== itemId)
    );
  };

  const handleWarningClose = () => {
    setWarningOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        selectedItems,
        selectItemForPayment,
        handleWarningClose,
      }}
    >
      {children}
      <Warning open={warningOpen} onClose={handleWarningClose} />
    </CartContext.Provider>
  );
};
