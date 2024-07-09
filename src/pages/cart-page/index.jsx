import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { Table, Button, Checkbox, Popconfirm, Modal, InputNumber } from "antd";
import Warning from "../../Warning";
import "./index.scss";

const CartPage = () => {
  const { cartItems, removeFromCart, selectItemForPayment, updateCartQuantity } = useCart();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [warningOpen, setWarningOpen] = useState(false);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleCheckboxChange = (e, record) => {
    const checked = e.target.checked;
    selectItemForPayment(record.id, checked);
    setSelectedOptions(prev => (checked ? [...prev, record.id] : prev.filter(id => id !== record.id)));
  };

  const handleDeleteItem = item => {
    removeFromCart(item.id);
    setSelectedOptions(prev => prev.filter(id => id !== item.id));
  };

  const handleQuantityChange = (value, item) => {
    updateCartQuantity(item.id, value); // Call updateCartQuantity function from CartContext
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      setWarningOpen(false);
    }
  }, [cartItems]);

  const handlePayment = () => {
    if (selectedOptions.length > 0) {
      const selectedItems = cartItems.filter(item => selectedOptions.includes(item.id));

      sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
      navigate("/order-form", {
        state: {
          cart: selectedItems,
          totalPrice: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)
        }
      });
    } else {
      Modal.warning({
        title: "Warning",
        content: "Please select at least one item to proceed to order."
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          onChange={e => handleCheckboxChange(e, record)}
          checked={selectedOptions.includes(record.id)}
        />
      )
    },
    {
      title: "No",
      dataIndex: "orderNumber",
      key: "orderNumber"
    },
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => {
        return (
          <div className="product-info">
            <img src={record.image} alt={record.name} className="product-image" />
            {record.type === 'Diamond' && (
              <div className="diamond-details">
                <h3 className="product-title">Diamond</h3>
                <div className="product-detail"><strong>Stock Number:</strong> {record.stockNumber}</div>
                <div className="product-detail"><strong>Carat Weight:</strong> {record.caratWeight} ct</div>
                <div className="product-detail"><strong>Color:</strong> {record.color}</div>
                <div className="product-detail"><strong>Clarity:</strong> {record.clarity}</div>
                <div className="product-detail"><strong>Cut:</strong> {record.cut}</div>
              </div>
            )}
            {record.type === 'DiamondRings' && (
              <div className="ring-details">
                <h3 className="product-title">{record.name}</h3>
                <div className="product-detail"><strong>Category:</strong> {record.category}</div>
                <div className="product-detail"><strong>Material:</strong> {record.material}</div>
                <div className="product-detail"><strong>Size:</strong> {record.ringSize}</div>
              </div>
            )}

            {record.type === 'Bridal' && (
              <div className="ring-details">
                <h3 className="product-title">{record.NameBridal}</h3>
                <div className="product-detail"><strong>Material:</strong> {record.material}</div>
                <div className="product-detail"><strong>Size:</strong> {record.ringSize}</div>
                <div className="product-detail"><strong>Category:</strong> {record.category}</div>
              </div>
            )}

            {record.type === 'DiamondTimepieces' && (
              <div className="timepieces-details">
                <h3 className="product-title">{record.name}</h3>
                <div className="product-detail"><strong>TimepiecesStyle:</strong> {record.timepiecesStyle}</div>
                <div className="product-detail"><strong>CaseSize:</strong> {record.caseSize}</div>
                <div className="product-detail"><strong>Crystal Type:</strong> {record.crystalType}</div>
              </div>
            )}
          </div>
        );
      }
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={value => handleQuantityChange(value, record)}
          disabled={record.type === 'Diamond'} // Disable input if item is a diamond
        />
      )
    },
    {
      title: "Đơn Giá (Original Price)",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `$${record.price.toFixed(2)}`, // Display price formatted as currency
    },
    {
      title: "Thành Tiền (Total Price)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) => `$${(record.price * record.quantity).toFixed(2)}`, // Display total price formatted as currency
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
      )
    }
  ];

  const data = useMemo(
    () =>
      cartItems.map((item, index) => ({
        key: item.id,
        id: item.id,
        orderNumber: index + 1, // Adding order number
        productName: item.name, // Assuming item.name is used for productName
        price: item.price,
        image: item.image,
        stockNumber: item.stockNumber,
        caratWeight: item.caratWeight,
        color: item.color,
        clarity: item.clarity, // Additional fields for Diamond
        cut: item.cut, // Additional fields for Diamond

        name: item.name, // Additional fields for Rings
        category: item.category, // Additional fields for Rings
        material: item.material, // Additional fields for Rings
        ringSize: item.ringSize, // Additional fields for Rings

        nameBridal: item.nameBridal, // Additional fields for Bridal
       
        timepiecesStyle: item.timepiecesStyle, // Additional fields for Timepieces
        caseSize: item.caseSize, // Additional fields for Timepieces
        crystalType: item.crystalType, // Additional fields for Timepieces

        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        checkbox: selectedOptions.includes(item.id),
        type: item.type, // Assuming item.type determines Diamond or Rings
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
