import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

function RequestWarranty() {
  const [warrantyRequests, setWarrantyRequests] = useState([]);

  useEffect(() => {
    fetchWarrantyRequests();
  }, []);

  const fetchWarrantyRequests = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage
      const response = await axios.get(
        "http://localhost:8090/auth/view-warranty-manager",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      if (response.data.status) {
        // Remove duplicates based on OrderID
        const uniqueWarrantyRequests = Array.from(new Set(response.data.warrantyRequests.map(req => req.OrderID)))
          .map(OrderID => response.data.warrantyRequests.find(req => req.OrderID === OrderID));

        setWarrantyRequests(uniqueWarrantyRequests);
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching warranty requests:", error);
      message.error("Error fetching warranty requests");
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      key: "OrderDate",
      render: (text) => new Date(text).toLocaleDateString(),
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
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/manager-view-warrantydetails/${record.OrderID}`}>
          <Button>View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={warrantyRequests} columns={columns} rowKey="OrderID" />
    </div>
  );
}

export default RequestWarranty;
