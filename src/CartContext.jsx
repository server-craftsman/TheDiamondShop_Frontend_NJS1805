// CartContext.js
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

  // const addToCart = (item) => {
  //   setCartItems((prevItems) => {
  //     const existingItem = prevItems.find(
  //       (cartItem) => cartItem.id === item.id && cartItem.type === item.type
  //     );
  //     if (existingItem) {
  //       setWarningOpen(true);
  //       return prevItems;
  //     } else {
  //       return [...prevItems, { ...item, quantity: 1 }];
  //     }
  //   });
  // };
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
      );
      if (existingItem) {
        setWarningOpen(true); // Show warning if item already exists
        return prevItems;
      } else {
        return [...prevItems, { ...item, quantity: 1, selected: false }];
      }
    });
  };

  const removeFromCart = (itemId, itemType) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === itemId && item.type === itemType)
      )
    );
  };

  const updateCartQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // const selectItemForPayment = (itemId, isSelected) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === itemId ? { ...item, selected: isSelected } : item
  //     )
  //   );
  //   setSelectedItems((prevSelected) =>
  //     isSelected
  //       ? [...prevSelected, itemId]
  //       : prevSelected.filter((id) => id !== itemId)
  //   );
  // };
  const selectItemForPayment = (itemId, itemType, isSelected) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.type === itemType
          ? { ...item, selected: isSelected }
          : item
      )
    );
    setSelectedItems((prevSelected) =>
      isSelected
        ? [...prevSelected, { id: itemId, type: itemType }]
        : prevSelected.filter(
            (selectedItem) =>
              !(selectedItem.id === itemId && selectedItem.type === itemType)
          )
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
