import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";

function DeliveryCompleted() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/features/view-order-conpleted"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
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
              {/* <div className="delivery__actions">
                <button
                  onClick={() => updateStatus(order.OrderID, "Shipped")}
                >
                  Shipped
                </button>
                <button
                  onClick={() => updateStatus(order.OrderID, "Completed")}
                >
                  Completed
                </button>
              </div> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
    <footer className="delivery__footer">
      <p> 2024 Delivery Service. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default DeliveryCompleted