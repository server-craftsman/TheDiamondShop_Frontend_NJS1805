import { createContext, useState, useContext, useEffect } from "react";

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
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Cập nhật số lượng cho sản phẩm hiện có
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
      } else {
        // Thêm sản phẩm mới vào giỏ hàng
        return [...prevItems, { ...item, quantity: 1}];
      }
    });
  };

 
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
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
        selectedItems,
        setCartItems,
        selectItemForPayment,
        handleWarningClose,
      }}
    >
      {children}
      {/* <Warning open={warningOpen} onClose={handleWarningClose} /> */}
    </CartContext.Provider>
  );
};
