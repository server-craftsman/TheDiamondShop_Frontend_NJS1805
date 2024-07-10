import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { Table, Button, Checkbox, Popconfirm, Modal, InputNumber } from "antd";
import Warning from "../../Warning";
import "./index.scss";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQuantity,
    selectedItems,
    selectItemForPayment,
    handleWarningClose,
  } = useCart();
  const navigate = useNavigate();
  const [warningOpen, setWarningOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false); // State cho checkbox tất cả

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    // Kiểm tra nếu tất cả các mục đều đã được chọn thì set checkbox tất cả là true
    const allSelected =
      cartItems.length > 0 &&
      cartItems.every((item) => selectedItems.includes(item.type));
    setSelectAllChecked(allSelected);
  }, [cartItems, selectedItems]);

  const handleCheckboxChange = (record, checked) => {
    selectItemForPayment(record.type, checked);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const allItemTypes = cartItems.map((item) => item.type);
  
    allItemTypes.forEach((type) => {
      selectItemForPayment(type, checked);
    });
  
    setSelectAllChecked(checked);
  };

  const handleDeleteItem = (item) => {
    removeFromCart(item.id, item.type);
  };

  const handleQuantityChange = (value, item) => {
    updateCartQuantity(item.id, value);
  };

  const handlePayment = () => {
    const selectedItemsData = cartItems.filter((item) =>
      selectedItems.includes(item.type)
    );

    if (selectedItemsData.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      navigate("/order-form", {
        state: {
          cart: selectedItemsData,
          totalPrice: selectedItemsData.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ),
        },
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
      title: (
        <Checkbox
          onChange={handleSelectAllChange}
          checked={selectAllChecked}
          indeterminate={
            cartItems.length > 0 &&
            !selectAllChecked &&
            selectedItems.length > 0 &&
            selectedItems.length < cartItems.length
          }
        />
      ),
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record, e.target.checked)}
          checked={selectedItems.includes(record.type)}
        />
      ),
    },
    {
      title: "No",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="product-info">
          <img src={record.image} alt={record.name} className="product-image" />
          {record.type === "Diamond" && (
            <div className="diamond-details">
              <h3 className="product-title">Diamond</h3>
              <div className="product-detail">
                <strong>Stock Number:</strong> {record.stockNumber}
              </div>
              <div className="product-detail">
                <strong>Carat Weight:</strong> {record.caratWeight} ct
              </div>
              <div className="product-detail">
                <strong>Color:</strong> {record.color}
              </div>
              <div className="product-detail">
                <strong>Clarity:</strong> {record.clarity}
              </div>
              <div className="product-detail">
                <strong>Cut:</strong> {record.cut}
              </div>
            </div>
          )}
          {record.type === "DiamondRings" && (
            <div className="ring-details">
              <h3 className="product-title">{record.name}</h3>
              <div className="product-detail">
                <strong>Category:</strong> {record.category}
              </div>
              <div className="product-detail">
                <strong>Material:</strong> {record.material}
              </div>
              <div className="product-detail">
                <strong>Size:</strong> {record.ringSize}
              </div>
            </div>
          )}
          {record.type === "Bridal" && (
            <div className="ring-details">
              <h3 className="product-title">{record.nameBridal}</h3>
              <div className="product-detail">
                <strong>Material:</strong> {record.material}
              </div>
              <div className="product-detail">
                <strong>Size:</strong> {record.ringSize}
              </div>
              <div className="product-detail">
                <strong>Category:</strong> {record.category}
              </div>
            </div>
          )}
          {record.type === "DiamondTimepieces" && (
            <div className="timepieces-details">
              <h3 className="product-title">{record.name}</h3>
              <div className="product-detail">
                <strong>TimepiecesStyle:</strong> {record.timepiecesStyle}
              </div>
              <div className="product-detail">
                <strong>CaseSize:</strong> {record.caseSize}
              </div>
              <div className="product-detail">
                <strong>Crystal Type:</strong> {record.crystalType}
              </div>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(value, record)}
          disabled={record.type === "Diamond" || "Bridal" || "DiamondRings" || "DiamondTimepieces"} // Disable input if item is a diamond
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `$${record.price.toFixed(2)}`, // Display price formatted as currency
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) =>
        `$${(record.price * record.quantity).toFixed(2)}`, // Display total price formatted as currency
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
      cartItems.map((item, index) => ({
        ...item,
        orderNumber: index + 1,
      })),
    [cartItems]
  );

  return (
    <div className="cart-page">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
      <div className="total-price">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <Button onClick={handlePayment} disabled={selectedItems.length === 0}>
        Proceed to Checkout
      </Button>
      <Warning open={warningOpen} onClose={handleWarningClose} />
    </div>
  );
};

export default CartPage;
