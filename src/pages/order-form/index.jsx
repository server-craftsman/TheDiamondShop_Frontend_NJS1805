import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import axios from "axios";
import { Button, Input, Table, Radio, message } from "antd";
import "./index.scss";

const OrderForm = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: "",
  });

  const [eligibleVouchers, setEligibleVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);

  useEffect(() => {
    const price = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(price);

    axios
      .get("http://localhost:8090/vouchers")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const eligible = response.data.filter(
            (voucher) => price >= voucher.Prerequisites
          );
          setEligibleVouchers(eligible);
        } else {
          console.error("Vouchers data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
        setError("Failed to fetch vouchers. Please try again.");
      });
  }, [cartItems]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Apply voucher if selected
      let finalTotalPrice = totalPrice;
      if (selectedVoucher) {
        const voucherResponse = await applyVoucher(selectedVoucher.VoucherID);
        if (voucherResponse.discountAmount) {
          finalTotalPrice -= voucherResponse.discountAmount;
        }
      }

      const orderDetails = {
        ...orderData,
        cartItems,
        totalPrice: finalTotalPrice,
        voucherID: selectedVoucher ? selectedVoucher.VoucherID : null,
        orderDate: new Date().toISOString().split("T")[0],
      };

      // Create new order
      const response = await axios.post(
        "http://localhost:8090/orders/create-order",
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderID = response.data.OrderID;

      // Update inventory after successful order creation
      await axios.put(
        "http://localhost:8090/orders/update-inventory",
        {
          cartItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/order-success", { state: { orderID: orderID } });
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Error creating order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleVoucherChange = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const applyVoucher = async (voucherID) => {
    try {
      const response = await fetch("http://localhost:8090/orders/apply-voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ voucherID }),
      });

      if (response.status === 401) {
        const refreshResponse = await fetch(
          "http://localhost:8090/orders/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              refreshToken: localStorage.getItem("refreshToken"),
            }),
          }
        );

        if (refreshResponse.ok) {
          const { token } = await refreshResponse.json();
          localStorage.setItem("token", token);

          return applyVoucher(voucherID);
        } else {
          throw new Error("Failed to refresh token.");
        }
      } else if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to apply voucher. Server responded with: ${errorText}`);
      }

      const data = await response.json();
      message.success("Voucher applied successfully!");
      return data;
    } catch (error) {
      console.error("Error:", error);
      message.error("Error applying voucher. Please try again.");
      throw error;
    }
  };

  const toggleOrderSummary = () => {
    setOrderSummaryVisible(!orderSummaryVisible);
  };

  const handleApplyVoucherClick = async () => {
    if (selectedVoucher) {
      try {
        await applyVoucher(selectedVoucher.VoucherID);
      } catch (error) {
        setError("Failed to apply voucher. Please try again.");
      }
    } else {
      message.warning("Please select a voucher to apply.");
    }
  };

  return (
    <div className="order-form">
      <h2>Order Form</h2>
      <Input
        name="firstName"
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <Input
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleInputChange}
      />
      <Input
        name="deliveryAddress"
        placeholder="Delivery Address"
        onChange={handleInputChange}
      />

      <Table
        dataSource={eligibleVouchers}
        columns={[
          {
            title: "Voucher Name",
            dataIndex: "VoucherName",
            key: "VoucherName",
          },
          {
            title: "Prerequisites",
            dataIndex: "Prerequisites",
            key: "Prerequisites",
          },
          {
            title: "Discount",
            dataIndex: "Discount",
            key: "Discount",
            render: (text) => `${text}%`,
          },
          {
            title: "Action",
            render: (voucher) => (
              <Radio
                onChange={() => handleVoucherChange(voucher)}
                checked={
                  selectedVoucher &&
                  selectedVoucher.VoucherID === voucher.VoucherID
                }
              >
                Select Voucher
              </Radio>
            ),
          },
        ]}
      />

      <Button onClick={handleApplyVoucherClick} disabled={loading}>
        Apply Voucher
      </Button>

      <Button onClick={toggleOrderSummary} disabled={loading}>
        {orderSummaryVisible ? "Hide Order Summary" : "Show Order Summary"}
      </Button>

      {orderSummaryVisible && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>First Name: {orderData.firstName}</p>
          <p>Last Name: {orderData.lastName}</p>
          <p>Phone Number: {orderData.phoneNumber}</p>
          <p>Delivery Address: {orderData.deliveryAddress}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          {selectedVoucher && (
            <p>Applied Voucher: {selectedVoucher.VoucherName}</p>
          )}
        </div>
      )}

      <Button onClick={handleSubmit} disabled={loading}>
        Confirm Order
      </Button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default OrderForm;
