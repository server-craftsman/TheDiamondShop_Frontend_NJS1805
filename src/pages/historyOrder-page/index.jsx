import { Table } from 'antd';
import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import "../historyOrder-page/index.scss";
import { AuthContext } from '../../AuthContext';

function HistoryOrder() {
  const { user } = useContext(AuthContext);
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchHistoryOrders(user.AccountID);
    }
  }, [user]);  //check user login

  const fetchHistoryOrders = async (accountID) => {
    try {
      const response = await fetch('http://localhost:8090/features/history-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ AccountID: accountID }),
      });
      const data = await response.json();
      if (data.status) {
        setHistoryOrders(data.HistoryOrder);
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'OrderID',
      key: 'OrderID',
    },
    {
      title: 'Order Date',
      dataIndex: 'OrderDate',
      key: 'OrderDate',
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
    },
    {
      title: 'Order Status',
      dataIndex: 'OrderStatus',
      key: 'OrderStatus',
    },
    {
      title: 'Total Price',
      dataIndex: 'TotalPrice',
      key: 'TotalPrice',
    },
  ];

  return (
    <div className='history'>
      <h1>History Order</h1> <br />
      <Table
        columns={columns}
        dataSource={historyOrders}
        rowKey="OrderID"
      />


    </div>
  )
}

export default HistoryOrder;
