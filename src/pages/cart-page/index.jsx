import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { Table, Button, Checkbox, Popconfirm, Modal, InputNumber } from "antd";
import { RestOutlined } from "@ant-design/icons";
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
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  useEffect(() => {
    const allSelected =
      cartItems.length > 0 &&
      cartItems.every((item) =>
        selectedItems.some(
          (selectedItem) =>
            selectedItem.id === item.id && selectedItem.type === item.type
        )
      );
    setSelectAllChecked(allSelected);
  }, [cartItems, selectedItems]);

  const handleCheckboxChange = (record, checked) => {
    selectItemForPayment(record.id, record.type, checked);
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    const allItemIds = cartItems.map((item) => ({
      id: item.id,
      type: item.type,
    }));

    allItemIds.forEach((item) => {
      selectItemForPayment(item.id, item.type, checked);
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
      selectedItems.some(
        (selectedItem) =>
          selectedItem.id === item.id && selectedItem.type === item.type
      )
    );

    const hasDiamond = selectedItemsData.some(
      (item) => item.type === "Diamond"
    );

    if (!hasDiamond) {
      Modal.warning({
        title: "Warning",
        content: "You must select at least one Diamond item to proceed to order.",
      });
      return;
    }

    if (selectedItemsData.length > 0) {
      sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
      selectedItemsData.forEach((item) => {
        removeFromCart(item.id, item.type);
      });
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
          checked={selectedItems.some(
            (selectedItem) =>
              selectedItem.id === record.id && selectedItem.type === record.type
          )}
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
              <h3 className="product-title">{record.name}</h3>
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
      className: "hidden-column",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(value, record)}
          disabled={
            record.type === "Diamond" ||
            record.type === "Bridal" ||
            record.type === "DiamondRings" ||
            record.type === "DiamondTimepieces"
          }
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `$${record.price.toFixed(2)}`,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) =>
        `$${(record.price * record.quantity).toFixed(2)}`,
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
          <RestOutlined className="custom-icon" />
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
    <div className="cart__page">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        className="cart-table"
      />
      <div className="cart__page__total">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <Button type="primary" onClick={handlePayment}>
          Proceed to Order Form
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
