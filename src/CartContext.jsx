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
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.material === item.material &&
          cartItem.ringSize === item.ringSize
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.material === item.material &&
          cartItem.ringSize === item.ringSize
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // const updateCartQuantity = (itemId, newQuantity) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       (item.id === itemId && item.type !== "Diamond") ||
  //       item.type !== "DiamondTimepieces" ||
  //       item.type !== "DiamondRings" ||
  //       item.type !== "Bridal" // Assuming this check is correct
  //         ? { ...item, quantity: newQuantity }
  //         : item
  //     )
  //   );
  // };
  const updateCartQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        const excludedTypes = [
          "Diamond",
          "DiamondTimepieces",
          "DiamondRings",
          "Bridal",
        ];
        if (!excludedTypes.includes(item.type) || item.id !== itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
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
