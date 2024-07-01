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
  // const { user, token } = useContext(AuthContext); // Ensure AuthContext provides 'user' and 'token'


  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleCheckboxChange = (e, record) => {
    const checked = e.target.checked;
    selectItemForPayment(record.key, checked);
    setSelectedOptions((prev) =>
      checked ? [...prev, record.key] : prev.filter((id) => id !== record.key)
    );
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
    removeFromCart(item.id);
    setSelectedOptions(selectedOptions.filter((id) => id !== item.id));
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setWarningOpen(false);
    }
  }, [cartItems]);

  const handlePayment = () => {
    if (selectedOptions.length > 0) {
      const selectedItems = cartItems.filter((item) =>
      selectedOptions.includes(item.id));

      sessionStorage.setItem(
        "selectedOptions",
        JSON.stringify(selectedOptions)
      );
      navigate("/order-form", {
        state: {
          cart: selectedItems,
          totalPrice: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
        }
      });
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
        <Checkbox onChange={(e) => handleCheckboxChange(e, record)} 
        checked={selectedOptions.includes(record.key)}/>
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
      title: "Stock Number",
      dataIndex: "stockNumber",
      key: "stockNumber",
    },
    {

      title: "Carat Weight",
      dataIndex: "caratWeight",
      key: "caratWeight",
    },
    {

      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `$${record.price.toFixed(2)}`, // Display price formatted as currency
    },
    {
      title: "Actions",
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
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        type: item.type,
        stockNumber: item.stockNumber,
        caratWeight: item.caratWeight,
        clarity: item.clarity,
        cut: item.cut,
        polish: item.polish,
        symmetry: item.symmetry,
        fluorescence: item.fluorescence,
        description: item.description,
        gender: item.gender,
        stoneType: item.stoneType,
        stoneShape: item.stoneShape,
        stoneSize: item.stoneSize,
        stoneClarity: item.stoneClarity,
        stoneCut: item.stoneCut,
        stonePolish: item.stonePolish,
        stoneSymmetry: item.stoneSymmetry,
        stoneFluorescence: item.stoneFluorescence,
        stoneDescription: item.stoneDescription,
        stoneGender: item.stoneGender,
        stoneCaratWeight: item.stoneCaratWeight,
        color: item.color,
        totalPrice: item.price * item.quantity,
        checkbox: selectedOptions.includes(item.id),
      })),
    [cartItems, selectedOptions]
  );

  return (
    <div className="cart-page">
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="total-price">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <Button onClick={handlePayment} disabled={selectedOptions.length === 0}>
      Proceed to Checkout
      </Button>
      <Warning open={warningOpen} onClose={() => setWarningOpen(false)} />
    </div>
  );
};

export default CartPage;
