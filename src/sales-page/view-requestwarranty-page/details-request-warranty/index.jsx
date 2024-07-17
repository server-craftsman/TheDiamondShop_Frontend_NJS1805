import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, message, Popconfirm, Select } from "antd";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";
import moment from "moment";

function ViewWarrantyDetails() {
  const { orderId } = useParams();
  const [warrantyDetails, setWarrantyDetails] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user && orderId) {
      fetchWarrantyDetails();
      }
    }, [user, orderId]);

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
        // Remove duplicate entries and handle null values
        const uniqueWarrantyDetails = response.data.warrantyDetail.reduce(
          (acc, current) => {
            const found = acc.find((item) => item.ReportNo === current.ReportNo);
            if (!found) {
              acc.push(current);
            }
            return acc;
          },
          []
        );
        setWarrantyDetails(uniqueWarrantyDetails);
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

  const handleWarrantyStatusChange = async (orderId, warrantyStatus) => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await axios.put(
        "http://localhost:8090/warranty/update-warrantystatus",
        {
          orderId,
          warrantyStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Warranty status updated successfully");
        fetchWarrantyDetails(); // Refresh the data
      } else {
        message.error(
          response.data.message || "Failed to update warranty status"
        );
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update warranty status");
    }
  };

  const confirmProcessing = () => {
    handleWarrantyStatusChange(orderId, "Processing");
  };

  if (!warrantyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Descriptions title="Order Summary" bordered>
        {warrantyDetails[0]?.OrderID && (
          <Descriptions.Item label="Order ID">
            {warrantyDetails[0].OrderID}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.OrderDate && (
          <Descriptions.Item label="Order Date">
            {moment(warrantyDetails[0].OrderDate).format('YYYY-MM-DD')}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.TotalPrice && (
          <Descriptions.Item label="Total Price">
            {warrantyDetails[0].TotalPrice}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.DeliveryAddress && (
          <Descriptions.Item label="Delivery Address">
            {warrantyDetails[0].DeliveryAddress}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.OrderStatus && (
          <Descriptions.Item label="Order Status">
            {warrantyDetails[0].OrderStatus}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.Shipping && (
          <Descriptions.Item label="Shipping">
            {warrantyDetails[0].Shipping}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.Quantity && (
          <Descriptions.Item label="Quantity">
            {warrantyDetails[0].Quantity}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.AttachedAccessories && (
          <Descriptions.Item label="Attached Accessories">
            {warrantyDetails[0].AttachedAccessories}
          </Descriptions.Item>
        )}
        {/* {warrantyDetails[0]?.ReportNo && (
          <Descriptions.Item label="Report No">
            {warrantyDetails[0].ReportNo}
          </Descriptions.Item>
        )} */}
        {warrantyDetails[0]?.RequestWarranty && (
          <Descriptions.Item label="Request Warranty">
            {warrantyDetails[0].RequestWarranty}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.WarrantyStatus && (
          <Descriptions.Item label="Warranty Status">
            {warrantyDetails[0].WarrantyStatus}
          </Descriptions.Item>
        )}
      </Descriptions>

      {/* Customer Details */}
      <Descriptions title="Customer Information" bordered>
        {warrantyDetails[0]?.FirstName && (
          <Descriptions.Item label="First Name">
            {warrantyDetails[0].FirstName}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.LastName && (
          <Descriptions.Item label="Last Name">
            {warrantyDetails[0].LastName}
          </Descriptions.Item>
        )}
        {warrantyDetails[0]?.PhoneNumber && (
          <Descriptions.Item label="Phone Number">
            {warrantyDetails[0].PhoneNumber}
          </Descriptions.Item>
        )}
      </Descriptions>

      {warrantyDetails.map((details, index) => (
        <div key={index}>
          {/* Diamond Details */}
          {(details.StockNumber || details.Clarity || details.Color) && (
            <>
              <h2>Diamond {details.ReportNo}</h2>
              <Descriptions bordered>
                {details.StockNumber && (
                  <Descriptions.Item label="Diamond Stock Number">
                    {details.StockNumber}
                  </Descriptions.Item>
                )}
                {details.Clarity && (
                  <Descriptions.Item label="Diamond Clarity">
                    {details.Clarity}
                  </Descriptions.Item>
                )}
                {details.Color && (
                  <Descriptions.Item label="Diamond Color">
                    {details.Color}
                  </Descriptions.Item>
                )}
                {details.ReportNo && (
                  <Descriptions.Item label="Report No">
                    {details.ReportNo}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          {/* Diamond Rings Details */}
          {(details.RingStyle || details.NameRings || details.RingCategory) && (
            <>
              <h2>Diamond Rings {details.ReportNo}</h2>
              <Descriptions bordered>
                {details.RingStyle && (
                  <Descriptions.Item label="Ring Style">
                    {details.RingStyle}
                  </Descriptions.Item>
                )}
                {details.NameRings && (
                  <Descriptions.Item label="Name Rings">
                    {details.NameRings}
                  </Descriptions.Item>
                )}
                {details.RingCategory && (
                  <Descriptions.Item label="Ring Category">
                    {details.RingCategory}
                  </Descriptions.Item>
                )}
                {details.ReportNo && (
                  <Descriptions.Item label="Report No">
                    {details.ReportNo}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          {/* Bridal Details */}
          {(details.NameBridal || details.BridalStyle || details.BridalCategory) && (
            <>
              <h2>Bridal {details.ReportNo}</h2>
              <Descriptions bordered>
                {details.NameBridal && (
                  <Descriptions.Item label="Bridal Name">
                    {details.NameBridal}
                  </Descriptions.Item>
                )}
                {details.BridalStyle && (
                  <Descriptions.Item label="Bridal Style">
                    {details.BridalStyle}
                  </Descriptions.Item>
                )}
                {details.BridalCategory && (
                  <Descriptions.Item label="Bridal Category">
                    {details.BridalCategory}
                  </Descriptions.Item>
                )}
                {details.ReportNo && (
                  <Descriptions.Item label="Report No">
                    {details.ReportNo}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

          {/* Timepieces Details */}
          {(details.NameTimepieces || details.TimepiecesStyle || details.Collection) && (
            <>
              <h2>Timepieces {details.ReportNo}</h2>
              <Descriptions bordered>
                {details.NameTimepieces && (
                  <Descriptions.Item label="Timepieces Name">
                    {details.NameTimepieces}
                  </Descriptions.Item>
                )}
                {details.TimepiecesStyle && (
                  <Descriptions.Item label="Timepieces Style">
                    {details.TimepiecesStyle}
                  </Descriptions.Item>
                )}
                {details.Collection && (
                  <Descriptions.Item label="Timepieces Collection">
                    {details.Collection}
                  </Descriptions.Item>
                )}
                {details.ReportNo && (
                  <Descriptions.Item label="Report No">
                    {details.ReportNo}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </>
          )}

         {/* Navigation buttons */}
         
          <Link to={`/view-warranty/${details.ReportNo}`}>
            <Button>View Warranty</Button>
          </Link>
        </div>
      ))}

      {/* Render the buttons based on warranty request status */}
      {warrantyDetails[0].RequestWarranty === "Assign" && (
        <Button onClick={() => handleStatusChange(orderId, "Processing")}>
          Processing
        </Button>
      )}
      {warrantyDetails[0].RequestWarranty === "Processing" && (
        <Select
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(orderId, value)}
          defaultValue="Processing"
        >
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Refused">Refused</Select.Option>
        </Select>
      )}
      {warrantyDetails[0].RequestWarranty === "Approved" && warrantyDetails[0].WarrantyStatus !== "Processing" && warrantyDetails[0].WarrantyStatus !== "Completed" && (
        <Popconfirm
        title="Are you sure you want to change the status to Processing?"
        onConfirm={confirmProcessing}
        okText="Yes"
        cancelText="No"
      >
        <Button>Processing</Button>
      </Popconfirm>
      )}
      <Button onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}

export default ViewWarrantyDetails;
