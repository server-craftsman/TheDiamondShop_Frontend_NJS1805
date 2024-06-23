import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./index.scss";
import { Button, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function DeliveryPage() {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/userProfile-page">Profile</Link>
      </Menu.Item>
      <Menu.Item key="1" onClick={logout}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    // Fetch initial order data from the back-end
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/features/orderstatus-delivery"
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.post(
        "http://localhost:8090/features/update-order-status-delivery",
        {
          id,
          status: newStatus,
        }
      );
      setOrders(
        orders.map((order) =>
          order.OrderID === id ? { ...order, OrderStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="delivery">
      <header className="delivery__header">
        <h1>Delivery Management</h1>
        {user ? (
          <Dropdown overlay={userMenu} trigger={["hover"]}>
            <Button  style={{ fontSize: "1.5em", cursor: "pointer" }}>Username</Button>
          </Dropdown>
        ) : null}
      </header>
      <main className="delivery__body">
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
                  <button
                    onClick={() => updateStatus(order.OrderID, "Shipping")}
                  >
                    Shipping
                  </button>
                  <button
                    onClick={() => updateStatus(order.OrderID, "Shipped")}
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => updateStatus(order.OrderID, "Cancelled")}
                  >
                    Cancelled
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="delivery__footer">
        <p> 2024 Delivery Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default DeliveryPage;
