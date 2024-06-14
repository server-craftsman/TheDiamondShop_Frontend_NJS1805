import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import "./index.scss";
import { Table, Button, Checkbox } from "antd";
import { useMemo, useState } from "react";
const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  // Tính tổng số tiền
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Hàm để xử lý việc tăng số lượng sản phẩm
  const handleQuantityChange = (item, amount) => {
    if (item.quantity === 1 && amount === -1) {
      removeFromCart(item.id);
    } else {
      addToCart({ ...item, quantity: amount });
    }
  };
  // Hàm xử lý việc chọn sản phẩm
  const handleSelectItem = (item, checked) => {
    const newSelectedItems = checked
      ? [...selectedItems, item.id]
      : selectedItems.filter((id) => id !== item.id);
    setSelectedItems(newSelectedItems);
  };
  // Cấu trúc dữ liệu cho bảng Ant Design
  const columns = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      render: (text, record) => (
        <Checkbox
          onChange={(e) => handleSelectItem(record, e.target.checked)}
          checked={selectedItems.includes(record.id)}
        />
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
        <Button onClick={() => removeFromCart(record.id)}>Delete</Button>
      ),
    },
  ];

  // Chuẩn bị dữ liệu cho bảng
  const data = useMemo(
    () =>
      cartItems.map((item, index) => ({
        key: index,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        id: item.id,
        image: item.image,
      })),
    [cartItems]
  );
 const handlePayment = () => {
    // Lưu trữ selectedItems vào localStorage
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    // Chuyển đến trang thanh toán
    navigate('/payment-page');
  };
  return (
    <div className="cart-page">
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="total-price">
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
      <Link to="/payment-page" onClick={handlePayment}>
        <Button>Payment</Button>
      </Link>
    </div>
  );
};

export default CartPage;
