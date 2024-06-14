import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saveCart = localStorage.getItem("cart");
    return saveCart ? JSON.parse(saveCart) : [];
  });

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // Cập nhật số lượng cho sản phẩm hiện có
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };
  const selectItemForPayment = (itemId, isSelected) => {
    setSelectedItems((prevSelected) =>
      isSelected
        ? [...prevSelected, itemId]
        : prevSelected.filter((id) => id !== itemId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        selectedItems,
        selectItemForPayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
