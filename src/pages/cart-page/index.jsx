import React, { useMemo, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { Table, Button, Checkbox, Popconfirm, Modal } from "antd";
import Warning from "../../Warning"; // Adjust path if necessary
import { AuthContext } from "../../AuthContext";
import "./index.scss";

const CartPage = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [warningOpen, setWarningOpen] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Ensure AuthContext provides 'user' and 'token'

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleCheckboxChange = (e, record) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedOptions([...selectedOptions, record.key]);
    } else {
      setSelectedOptions(selectedOptions.filter((id) => id !== record.key));
    }
  };

  const handleQuantityChange = (item, amount) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.key === item.key
        ? { ...cartItem, quantity: cartItem.quantity + amount }
        : cartItem
    );

    if (amount < 0 && item.quantity === 1) {
      removeFromCart(item.key);
    } else {
      setCartItems(updatedCart);
    }
  };

  const handleDeleteItem = (item) => {
    removeFromCart(item.key);
    setSelectedOptions(selectedOptions.filter((id) => id !== item.key));
  };

  useEffect(() => {
    const hasDiamondOrBridal = cartItems.some(
      (item) => item.type === "Diamond" || item.type === "Bridal"
    );

    if (!hasDiamondOrBridal) {
      setWarningOpen(false); // Close warning if no Diamond or Bridal items
    }
  }, [cartItems]);

  const handlePayment = () => {
    if (selectedOptions.length > 0) {
      const selectedItems = cartItems.filter((item) =>
        selectedOptions.includes(item.key)
      );

      // Check conditions for required items
      const hasDiamond = selectedItems.some((item) => item.type === "Diamond");
      const hasBridal = selectedItems.some((item) => item.type === "Bridal");
      const hasDiamondRings = selectedItems.some(
        (item) => item.type === "DiamondRings"
      );
      const hasDiamondTimepieces = selectedItems.some(
        (item) => item.type === "DiamondTimepieces"
      );

      // Valid conditions to create an order
      const validConditions = hasDiamond || hasBridal;

      if (!validConditions) {
        try {
          if (user && token) {
            sessionStorage.setItem(
              "selectedOptions",
              JSON.stringify(selectedOptions)
            );
            sessionStorage.setItem("token", token);
            navigate("/order-form");
          } else {
            Modal.warning({
              title: "Warning",
              content: "User authentication failed. Please log in again.",
            });
          }
        } catch (error) {
          console.error("Error handling payment:", error);
        }
      } else {
        Modal.warning({
          title: "Warning",
          content:
            "Please select at least one Diamond or Bridal item to proceed with the order.",
        });
      }
    } else {
      Modal.warning({
        title: "Warning",
        content: "Please select at least one item to proceed to order.",
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox onChange={(e) => handleCheckboxChange(e, record)} />
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={record.image}
          alt={record.name}
          style={{ width: "50px", height: "auto" }}
        />
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleQuantityChange(record, -1)}
            disabled={record.quantity <= 1}
          >
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{text}</span>
          <Button onClick={() => handleQuantityChange(record, 1)}>+</Button>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Popconfirm
          title="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteItem(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const data = useMemo(
    () =>
      cartItems.map((item) => ({
        key: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        type: item.type,
      })),
    [cartItems]
  );

  return (
    <div className="cart-page">
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="total-price">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <Button onClick={handlePayment} disabled={selectedOptions.length === 0}>
        Create Order
      </Button>
      <Warning open={warningOpen} onClose={() => setWarningOpen(false)} />
    </div>
  );
};

export default CartPage;
