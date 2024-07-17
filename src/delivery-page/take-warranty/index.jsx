import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Popconfirm } from 'antd'; // Assuming you are using Ant Design

const ViewWarrantyStatusCompleted = () => {
  const [warrantyRequests, setWarrantyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarrantyRequests();
  }, []);
  const fetchWarrantyRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:8090/warranty/view-warrantystatus-processing', config);
      if (response.data.status) {
        // Remove duplicates based on OrderID
        const uniqueOrders = Array.from(new Set(response.data.warrantyRequests.map(order => order.OrderID)))
          .map(OrderID => response.data.warrantyRequests.find(order => order.OrderID === OrderID));
        
        setWarrantyRequests(uniqueOrders);
      } else {
        console.log(response.data.message); // Handle no data case
      }
    } catch (error) {
      console.error('Error fetching warranty requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        'http://localhost:8090/warranty/update-warrantystatus-Completed',
        { orderId, warrantyStatus: 'Completed' },
        config
      );
      if (response.status === 200) {
        // Update the local state after successful update
        const updatedRequests = warrantyRequests.map(order => {
          if (order.OrderID === orderId) {
            return { ...order, WarrantyStatus: 'Completed' };
          }
          return order;
        });
        setWarrantyRequests(updatedRequests);
        fetchWarrantyRequests();
        console.log('Warranty status updated successfully');
      } else {
        console.log(response.data.message); // Handle error case
      }
    } catch (error) {
      console.error('Error updating warranty status:', error);
    }
  };

  return (
    <div className="delivery">
      <div className="delivery__body">
        <section className="delivery__orders">
          <h2>Warranty List</h2>
          <ul>
            {warrantyRequests.map((order, index) => (
              <li key={index} className="delivery__order">
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
                  <strong>Order Status:</strong> {order.OrderStatus}
                </p>
                <p>
                  <strong>Request Warranty:</strong> {order.RequestWarranty}
                </p>
                <p>
                  <strong>Warranty Status:</strong> {order.WarrantyStatus}
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
                  {order.WarrantyStatus === 'Processing' && (
                    <Popconfirm
                      title="Are you sure you want to update the status to Completed?"
                      onConfirm={() => handleUpdateStatus(order.OrderID)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button>Completed</button>
                    </Popconfirm>
                  
                )}
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
};

export default ViewWarrantyStatusCompleted;
