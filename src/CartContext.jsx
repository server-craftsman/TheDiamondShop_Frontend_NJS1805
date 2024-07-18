// import React, { createContext, useState, useContext, useEffect } from "react";
// import Warning from "./Warning"; // Adjust path if necessary

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });
//   const [warningOpen, setWarningOpen] = useState(false);
//   const [warningMessage, setWarningMessage] = useState("");
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (cartItem) => cartItem.id === item.id && cartItem.type === item.type
//       );
//       const diamondExists = prevItems.some((cartItem) => cartItem.type === "Diamond");

//       if (existingItem) {
//         setWarningMessage("Item already exists in the cart.");
//         setWarningOpen(true); // Show warning if item already exists
//         return prevItems;
//       } else if (!diamondExists && ["Bridal", "DiamondRings", "DiamondTimepieces"].includes(item.type)) {
//         setWarningMessage("You need to add a Diamond first.");
//         setWarningOpen(true); // Show warning if trying to add an accessory without a diamond
//         return prevItems;
//       } else {
//         return [...prevItems, { ...item, quantity: 1, selected: false }];
//       }
//     });
//   };

//   const removeFromCart = (itemId, itemType) => {
//     setCartItems((prevItems) =>
//       prevItems.filter(
//         (item) => !(item.id === itemId && item.type === itemType)
//       )
//     );
//   };

//   const updateCartQuantity = (itemId, newQuantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const selectItemForPayment = (itemId, itemType, isSelected) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId && item.type === itemType
//           ? { ...item, selected: isSelected }
//           : item
//       )
//     );
//     setSelectedItems((prevSelected) =>
//       isSelected
//         ? [...prevSelected, { id: itemId, type: itemType }]
//         : prevSelected.filter(
//             (selectedItem) =>
//               !(selectedItem.id === itemId && selectedItem.type === itemType)
//           )
//     );
//   };

//   const handleWarningClose = () => {
//     setWarningOpen(false);
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     setSelectedItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         selectedItems,
//         selectItemForPayment,
//         handleWarningClose,
//         clearCart,
//       }}
//     >
//       {children}
//       <Warning open={warningOpen} onClose={handleWarningClose} message={warningMessage} />
//     </CartContext.Provider>
//   );
// };


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
  const [warningMessage, setWarningMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item) => {
    console.log("Adding item to cart:", item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type
      );
      const diamondExists = prevItems.some((cartItem) => cartItem.type === "Diamond");
  
      console.log("Existing item:", existingItem);
      console.log("Diamond exists:", diamondExists);
  
      if (existingItem) {
        console.log("Item already in cart");
        setWarningMessage("Cannot add this item to the cart because it is already in the cart.");
        setWarningOpen(true);
        return prevItems;
      } else if (!diamondExists && ["Bridal", "DiamondRings", "DiamondTimepieces"].includes(item.type)) {
        console.log("No Diamond item in cart");
        setWarningMessage("Cannot add this item to the cart because a Diamond item must be added first.");
        setWarningOpen(true);
        return prevItems;
      } else {
        setWarningMessage("Item added to the cart successfully!");
        setWarningOpen(true);
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

  const clearCart = () => {
    setCartItems([]);
    setSelectedItems([]);
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
        clearCart,
      }}
    >
      {children}
      <Warning open={warningOpen} onClose={handleWarningClose} message={warningMessage} />
    </CartContext.Provider>
  );
};
