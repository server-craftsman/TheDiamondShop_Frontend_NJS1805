import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Button, message } from "antd";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";

function ViewWarrantyByReportNo() {
  const { reportNo } = useParams();
  const [details, setDetails] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWarrantyDetails();
  }, [reportNo]);

  const fetchWarrantyDetails = async () => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.get(
        `http://localhost:8090/warranty/view-warranty-orderdetails/${reportNo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setDetails(response.data[0]);
      } else {
        message.error("Failed to fetch warranty details");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to fetch warranty details");
    }
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customer</h2>
      <Descriptions bordered>
        <Descriptions.Item label="First Name">{details.FirstName}</Descriptions.Item>
        <Descriptions.Item label="Last Name">{details.LastName}</Descriptions.Item>
        <Descriptions.Item label="Email">{details.Email}</Descriptions.Item>
        <Descriptions.Item label="Attached Accessories">{details.AttachedAccessories}</Descriptions.Item>
        <Descriptions.Item label="Shipping">{details.Shipping}</Descriptions.Item>
      </Descriptions>

      <h2>Order</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Order Date">{details.OrderDate}</Descriptions.Item>
        <Descriptions.Item label="Quantity">{details.Quantity}</Descriptions.Item>
        <Descriptions.Item label="Order Status">{details.OrderStatus}</Descriptions.Item>
        <Descriptions.Item label="Total Price">{details.TotalPrice}</Descriptions.Item>
      </Descriptions>

      <h2>Warranty</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Warranty Description">{details.Descriptions}</Descriptions.Item>
        <Descriptions.Item label="Warranty Date">{details.Date}</Descriptions.Item>
        <Descriptions.Item label="Place to Buy">{details.PlaceToBuy}</Descriptions.Item>
        <Descriptions.Item label="Warranty Period">{details.Period}</Descriptions.Item>
        <Descriptions.Item label="Warranty Type">{details.WarrantyType}</Descriptions.Item>
        <Descriptions.Item label="Warranty Conditions">{details.WarrantyConditions}</Descriptions.Item>
        <Descriptions.Item label="Accompanied Service">{details.AccompaniedService}</Descriptions.Item>
        <Descriptions.Item label="Warranty Condition">{details.Condition}</Descriptions.Item>
      </Descriptions>
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewWarrantyByReportNo;
