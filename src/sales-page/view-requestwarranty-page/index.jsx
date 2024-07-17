import React, { useContext, useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";

function ViewWarrantyRequest() {
  const { user } = useContext(AuthContext);
  const [warrantyRequests, setWarrantyRequests] = useState([]);

  useEffect(() => {
    fetchWarrantyRequests();
  }, [user]);

  const fetchWarrantyRequests = async () => {
    try {
      const token = user?.token;

      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await fetch('http://localhost:8090/auth/view-warranty-sale', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log('Fetch response:', data);

      if (response.ok) {
        // Remove duplicates based on OrderID
        const uniqueWarrantyRequests = Array.from(new Set(data.warrantyRequests.map(req => req.OrderID)))
          .map(OrderID => data.warrantyRequests.find(req => req.OrderID === OrderID));

        setWarrantyRequests(uniqueWarrantyRequests);
      } else {
        if (response.status === 401) {
          console.error('Access denied. Invalid token.');
          message.error('Session expired. Please log in again.');
        } else {
          console.error(data.message || 'Failed to fetch warranty requests');
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
    },
    {
      title: 'Order Date',
      dataIndex: 'OrderDate',
      key: 'OrderDate',
      render: (text) => new Date(text).toLocaleDateString(),
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
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Link to={`/view-warrantydetails/${record.OrderID}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Warranty Requests</h1>
      <Table columns={columns} dataSource={warrantyRequests} rowKey="OrderID" />
    </div>
  );
}

export default ViewWarrantyRequest;
