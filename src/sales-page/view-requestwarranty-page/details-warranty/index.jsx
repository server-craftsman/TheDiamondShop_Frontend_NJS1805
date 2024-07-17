import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Button, message } from "antd";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";
import "./index.scss"
function ViewWarrantyByReportNo() {
  const { reportNo } = useParams();
  const [details, setDetails] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user, reportNo){
    fetchWarrantyDetails();
    }
  }, [user, reportNo]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };
  
  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="warranty-container">
      <div className="warranty-header">
        <h1>Warranty Certificate</h1>
        <img 
          src="https://img.freepik.com/premium-vector/red-warranty-stamp-flat-design-check-mark-icon-checklist-document-shield-icon_476325-118.jpg"
          alt="Warranty Stamp"
          className="warranty-stamp"
          width={400}
        />
      </div>
      <div className="warranty-section">
        <h2>Customer Information</h2>
        <Descriptions bordered>
          <Descriptions.Item label="First Name">
            {details.FirstName}
          </Descriptions.Item>
          <Descriptions.Item label="Last Name">
            {details.LastName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{details.Email}</Descriptions.Item>
          <Descriptions.Item label="Attached Accessories">
            {details.AttachedAccessories}
          </Descriptions.Item>
          <Descriptions.Item label="Shipping">
            {details.Shipping}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="warranty-section">
        <h2>Order Information</h2>
        <Descriptions bordered>
          <Descriptions.Item label="Order Date">
            {formatDate(details.OrderDate)}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            {details.Quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Order Status">
            {details.OrderStatus}
          </Descriptions.Item>
          <Descriptions.Item label="Total Price">
            {details.TotalPrice}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="warranty-section">
        <h2>Warranty Details</h2>
        <Descriptions bordered>
          <Descriptions.Item label="Warranty Description" span={3}>
            {details.Descriptions}
          </Descriptions.Item>
          <Descriptions.Item label="Report No">
            {details.ReportNo}
          </Descriptions.Item>
          <Descriptions.Item label="Warranty Date">
            {formatDate(details.Date)}
          </Descriptions.Item>  
          <Descriptions.Item label="Place to Buy">
            {details.PlaceToBuy}
          </Descriptions.Item>
          <Descriptions.Item label="Warranty Period">
            {formatDate(details.Period)}
          </Descriptions.Item>
          <Descriptions.Item label="Warranty Type">
            {details.WarrantyType}
          </Descriptions.Item>
          <Descriptions.Item label="Warranty Conditions">
            {details.WarrantyConditions}
          </Descriptions.Item>
          <Descriptions.Item label="Accompanied Service">
            {details.AccompaniedService}
          </Descriptions.Item>
          <Descriptions.Item label="Warranty Condition">
            {details.Condition}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <Button className="back-button" onClick={() => window.history.back()}>
        Back
      </Button>
    </div>
  );
}

export default ViewWarrantyByReportNo;
