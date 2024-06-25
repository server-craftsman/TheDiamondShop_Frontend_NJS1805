import React, { useContext, useState, useEffect } from "react";
import { Table } from "antd";
import "../historyOrder-page/index.scss";
import { AuthContext } from "../../AuthContext";
import axios from "axios";

function HistoryOrder() {
  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    fetchHistoryOrders();
  }, [user]); // Ensure useEffect runs when user changes

  const fetchHistoryOrders = async () => {
    try {
      const token = user?.token; // Retrieve token from AuthContext
  
      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }
  
      const response = await fetch('http://localhost:8090/auth/history-order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Ensure credentials are sent
      });
  
      const data = await response.json();
      console.log('Fetch response:', data);
  
      if (data.status) {
        setHistoryOrders(data.historyOrder);
      } else {
        console.error(data.message); // Handle API error
      }
    } catch (error) {
      console.error('Fetch error:', error); // Handle fetch error
    }
  };
  

  const columns = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      key: "OrderID",
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      key: "OrderDate",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    },
    {
      title: "Total Price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
  ];

  return (
    <div className="history">
      <h1>History Order</h1>
      <Table columns={columns} dataSource={historyOrders} rowKey="OrderID" />
    </div>
  );
}

export default HistoryOrder;
