import { useState, useEffect } from "react";
import axios from "axios";
import { message, Popconfirm } from "antd";
import "./index.scss";

function DeliveryPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/features/view-order-shipping"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        "http://localhost:8090/features/update-order-status-delivery",
        {
          orderID: id,
          orderStatus: newStatus,
        }
      );
      message.success("Order status updated successfully");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      message.error("Failed to update order status");
    }
  };

  return (
    <div className="delivery">
      <div className="delivery__body">
        <section className="delivery__orders">
          <h2>Order List</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.OrderID} className="delivery__order">
                <p>
                  <strong>Customer:</strong> {order.FirstName} {order.LastName}
                </p>
                <p>
                  <strong>Phone Number:</strong> {order.PhoneNumber}
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.OrderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.Quantity}
                </p>
                <p>
                  <strong>Status:</strong> {order.OrderStatus}
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.TotalPrice}
                </p>
                <p>
                  <strong>Attached Accessories:</strong>{" "}
                  {order.AttachedAccessories}
                </p>
                <p>
                  <strong>Shipping:</strong> {order.Shipping}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {order.DeliveryAddress}
                </p>
                <div className="delivery__actions">
                  <Popconfirm
                    title="Are you sure you want to update the status to Completed?"
                    onConfirm={() => updateStatus(order.OrderID, "Completed")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button>Completed</button>
                  </Popconfirm>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer className="delivery__footer">
        <p>2024 Delivery Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DeliveryPage;
