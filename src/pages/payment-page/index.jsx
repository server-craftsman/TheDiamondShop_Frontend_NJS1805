import { useEffect, useState } from "react";
import { useCart } from "../../CartContext";
import "./index.scss";
import { Select } from "antd";

function Payment() {
  const { cartItems } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    // Lấy selectedItems từ localStorage
    const savedSelectedItems = localStorage.getItem("selectedItems");
    if (savedSelectedItems) {
      setSelectedItems(JSON.parse(savedSelectedItems));
    }
  }, []);

  // Lọc ra những sản phẩm được chọn để thanh toán
  const itemsToPay = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );
  const total = itemsToPay.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // Hàm xử lý thanh toán PayPal
  const handlePayPalPayment = async () => {
    // Tạo order và lấy orderId từ server
    try {
      const orderResponse = await fetch(
        `https://localhost:8090/orders/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: itemsToPay, customerDetails }),
        }
      );

      const orderData = await orderResponse.json();
      if (orderResponse.ok) {
        const orderId = orderData.orderId; // Lấy orderId từ phản hồi
        const paymentAmount = total; // Tổng số tiền từ giỏ hàng

        // Thực hiện thanh toán qua PayPal
        const paymentResponse = await fetch(
          `https://localhost:8090/orders/paypal-payment/${orderId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentAmount }),
          }
        );

        const paymentData = await paymentResponse.json();
        if (paymentResponse.ok) {
          console.log("Payment processed successfully:", paymentData);
          // Xử lý sau khi thanh toán thành công
        } else {
          console.error("Failed to process payment:", paymentData.error);
          // Xử lý khi có lỗi xảy ra
        }
      } else {
        console.error("Failed to create order:", orderData.error);
        // Xử lý khi tạo order thất bại
      }
    } catch (error) {
      console.error("Error processing PayPal payment:", error);
      // Xử lý ngoại lệ
    }
  };

  return (
    <div className="payment">
      <h1>Payment online</h1>
      <div className="customer-details">
        <input
          type="text"
          placeholder="Enter your name"
          value={customerDetails.name}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter your address"
          value={customerDetails.address}
          onChange={(e) =>
            setCustomerDetails({ ...customerDetails, address: e.target.value })
          }
        />
      </div>
      <div className="invoice">
        <h2>Payment detail</h2>
        <ul className="checkout">
          {itemsToPay.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
          <li>
            <Select
              defaultValue="Voucher 01"
              style={{
                width: 150,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Voucher 01",
                  label: "Discount 10%",
                },
                {
                  value: "Voucher 02",
                  label: "Discount 20%",
                },
                {
                  value: "Voucher 03",
                  label: "Discount 30%",
                },
                {
                  value: "Voucher 04",
                  label: "Discount 35%",
                },
              ]}
            />
          </li>
        </ul>
        <p className="total">Total: ${total.toFixed(2)}</p>
      </div>
      <div className="payment-method">
        <button onClick={handlePayPalPayment}>Pay with PayPal</button>
        <button>Pay with cast</button>
      </div>
    </div>
  );
}

export default Payment;
