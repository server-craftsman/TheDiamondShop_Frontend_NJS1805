import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { AuthContext } from "../../../AuthContext";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material"; // Import Material-UI components
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBack icon

function HistoryOrderDetails() {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams(); // Get OrderID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]); // Fetch again when orderId changes

  const fetchOrderDetails = async () => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await fetch(
        `http://localhost:8090/auth/history-order/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetch response:", data);
      setOrderDetails(data.orderDetails); // Ensure `data` structure matches your expected JSON format
    } catch (error) {
      console.error("Fetch error:", error);
      // Handle error using Material-UI Snackbar or similar
    }
  };

  const handleBack = () => {
    navigate("/historyOrder-page"); // Navigate back to history-order page
  };

  if (!orderDetails) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
          padding: "24px 0",
          marginTop: "100px",
          display: "flex",
        }}
      >
        <IconButton
          color="primary"
          aria-label="back"
          onClick={handleBack}
          style={{ marginBottom: "610px", display: "flex", marginLeft: "150px" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <div style={{ maxWidth: "800px", margin: "0 0 0 10px" }}>
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: "#37474f", fontWeight: "bold" }}
          >
            Order Details
          </Typography>
          <Paper
            elevation={3}
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            <Grid container spacing={3} style={{ padding: "24px" }}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Order ID
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.OrderID}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Order Date
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {new Date(orderDetails.OrderDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Quantity
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.Quantity}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Order Status
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.OrderStatus}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Total Price
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.TotalPrice}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Customer Name
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.FirstName} {orderDetails.LastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Email
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.Email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Phone Number
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.PhoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Attached Accessories
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.AttachedAccessories}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Shipping
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.Shipping}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Report Number
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.ReportNo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{ color: "#616161", fontWeight: "bold" }}
                >
                  Delivery Address
                </Typography>
                <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                  {orderDetails.DeliveryAddress}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default HistoryOrderDetails;