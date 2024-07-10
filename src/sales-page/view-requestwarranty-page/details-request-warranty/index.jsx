import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, message, Select } from "antd";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";

function ViewWarrantyDetails() {
  const { orderId } = useParams();
  const [warrantyDetails, setWarrantyDetails] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchWarrantyDetails();
  }, [orderId]);

  const fetchWarrantyDetails = async () => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.get(
        `http://localhost:8090/warranty/view-details-warranty/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.status) {
        setWarrantyDetails(response.data.warrantyDetail[0]);
      } else {
        message.error(
          response.data.message || "Failed to fetch warranty details"
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to fetch warranty details");
    }
  };

  const handleStatusChange = async (orderId, requestWarranty) => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.put(
        "http://localhost:8090/auth/update-warranty-sale",
        {
          orderId,
          requestWarranty,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Warranty request status updated successfully");
        fetchWarrantyDetails(); // Refresh the data
      } else {
        message.error(
          response.data.message || "Failed to update warranty request status"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update warranty request status");
    }
  };

  if (!warrantyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {warrantyDetails.FirstName || warrantyDetails.LastName || warrantyDetails.Email || warrantyDetails.PhoneNumber ? (
        <>
          <h2>Customer</h2>
          <Descriptions bordered>
            {warrantyDetails.FirstName && (
              <Descriptions.Item label="First Name">
                {warrantyDetails.FirstName}
              </Descriptions.Item>
            )}
            {warrantyDetails.LastName && (
              <Descriptions.Item label="Last Name">
                {warrantyDetails.LastName}
              </Descriptions.Item>
            )}
            {warrantyDetails.Email && (
              <Descriptions.Item label="Email">
                {warrantyDetails.Email}
              </Descriptions.Item>
            )}
            {warrantyDetails.PhoneNumber && (
              <Descriptions.Item label="Phone Number">
                {warrantyDetails.PhoneNumber}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {warrantyDetails.OrderID || warrantyDetails.OrderDate || warrantyDetails.Quantity || warrantyDetails.AttachedAccessories || warrantyDetails.Shipping || warrantyDetails.ReportNo || warrantyDetails.DeliveryAddress || warrantyDetails.OrderStatus || warrantyDetails.TotalPrice || warrantyDetails.RequestWarranty ? (
        <>
          <h2>Order</h2>
          <Descriptions bordered>
            {warrantyDetails.OrderID && (
              <Descriptions.Item label="Order ID">
                {warrantyDetails.OrderID}
              </Descriptions.Item>
            )}
            {warrantyDetails.OrderDate && (
              <Descriptions.Item label="Order Date">
                {new Date(warrantyDetails.OrderDate).toLocaleDateString()}
              </Descriptions.Item>
            )}
            {warrantyDetails.Quantity && (
              <Descriptions.Item label="Quantity">
                {warrantyDetails.Quantity}
              </Descriptions.Item>
            )}
            {warrantyDetails.AttachedAccessories && (
              <Descriptions.Item label="Attached Accessories">
                {warrantyDetails.AttachedAccessories}
              </Descriptions.Item>
            )}
            {warrantyDetails.Shipping && (
              <Descriptions.Item label="Shipping">
                {warrantyDetails.Shipping}
              </Descriptions.Item>
            )}
            {warrantyDetails.ReportNo && (
              <Descriptions.Item label="Report No">
                {warrantyDetails.ReportNo}
              </Descriptions.Item>
            )}
            {warrantyDetails.DeliveryAddress && (
              <Descriptions.Item label="Delivery Address">
                {warrantyDetails.DeliveryAddress}
              </Descriptions.Item>
            )}
            {warrantyDetails.OrderStatus && (
              <Descriptions.Item label="Order Status">
                {warrantyDetails.OrderStatus}
              </Descriptions.Item>
            )}
            {warrantyDetails.TotalPrice && (
              <Descriptions.Item label="Total Price">
                {warrantyDetails.TotalPrice}
              </Descriptions.Item>
            )}
            {warrantyDetails.RequestWarranty && (
              <Descriptions.Item label="Request Warranty">
                {warrantyDetails.RequestWarranty}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {warrantyDetails.StockNumber || warrantyDetails.Clarity || warrantyDetails.Color ? (
        <>
          <h2>Diamond</h2>
          <Descriptions bordered>
            {warrantyDetails.StockNumber && (
              <Descriptions.Item label="Diamond Stock Number">
                {warrantyDetails.StockNumber}
              </Descriptions.Item>
            )}
            {warrantyDetails.Clarity && (
              <Descriptions.Item label="Diamond Clarity">
                {warrantyDetails.Clarity}
              </Descriptions.Item>
            )}
            {warrantyDetails.Color && (
              <Descriptions.Item label="Diamond Color">
                {warrantyDetails.Color}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {warrantyDetails.RingStyle || warrantyDetails.NameRings || warrantyDetails.RingCategory ? (
        <>
          <h2>Diamond Rings</h2>
          <Descriptions bordered>
            {warrantyDetails.RingStyle && (
              <Descriptions.Item label="Ring Style">
                {warrantyDetails.RingStyle}
              </Descriptions.Item>
            )}
            {warrantyDetails.NameRings && (
              <Descriptions.Item label="Name Rings">
                {warrantyDetails.NameRings}
              </Descriptions.Item>
            )}
            {warrantyDetails.RingCategory && (
              <Descriptions.Item label="Ring Category">
                {warrantyDetails.RingCategory}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {warrantyDetails.NameBridal || warrantyDetails.BridalStyle || warrantyDetails.BridalCategory ? (
        <>
          <h2>Bridal</h2>
          <Descriptions bordered>
            {warrantyDetails.NameBridal && (
              <Descriptions.Item label="Bridal Name">
                {warrantyDetails.NameBridal}
              </Descriptions.Item>
            )}
            {warrantyDetails.BridalStyle && (
              <Descriptions.Item label="Bridal Style">
                {warrantyDetails.BridalStyle}
              </Descriptions.Item>
            )}
            {warrantyDetails.BridalCategory && (
              <Descriptions.Item label="Bridal Category">
                {warrantyDetails.BridalCategory}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {warrantyDetails.NameTimepieces || warrantyDetails.TimepiecesStyle || warrantyDetails.Collection ? (
        <>
          <h2>Timepieces</h2>
          <Descriptions bordered>
            {warrantyDetails.NameTimepieces && (
              <Descriptions.Item label="Timepieces Name">
                {warrantyDetails.NameTimepieces}
              </Descriptions.Item>
            )}
            {warrantyDetails.TimepiecesStyle && (
              <Descriptions.Item label="Timepieces Style">
                {warrantyDetails.TimepiecesStyle}
              </Descriptions.Item>
            )}
            {warrantyDetails.Collection && (
              <Descriptions.Item label="Timepieces Collection">
                {warrantyDetails.Collection}
              </Descriptions.Item>
            )}
          </Descriptions>
        </>
      ) : null}

      {/* Render the buttons based on warranty request status */}
      {warrantyDetails.RequestWarranty === "Assign" && (
        <Button onClick={() => handleStatusChange(orderId, "Processing")}>
          Processing
        </Button>
      )}
      {warrantyDetails.RequestWarranty === "Processing" && (
        <Select
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(orderId, value)}
          defaultValue="Processing"
        >
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Refused">Refused</Select.Option>
        </Select>
      )}

      <Button onClick={() => window.history.back()}>Back</Button>
      <Link to={`/view-warranty/${warrantyDetails.ReportNo}`}>
        <Button>View Warranty</Button>
      </Link>
    </div>
  );
}

export default ViewWarrantyDetails;
