import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import { AuthContext } from "../../../AuthContext";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material"; // Import Material-UI components
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import ArrowBack icon
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function HistoryOrderDetails() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { user } = useContext(AuthContext);
  const { orderId } = useParams(); // Get OrderID from URL params
  const navigate = useNavigate(); // Hook for navigation
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (user && orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId]); // Fetch again when user or orderId changes

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

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleBack = () => {
    navigate("/historyOrder-page"); // Navigate back to history-order page
  };

  const updateRequestWarranty = async () => {
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        return;
      }

      const response = await fetch(
        `http://localhost:8090/auth/update-warranty`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update response:", data);
      // Assuming `fetchOrderDetails` will update the state with new data
      fetchOrderDetails();
      setSnackbarMessage("Update Request Warranty successful");
      handleClick();
    } catch (error) {
      console.error("Update error:", error);
      // Handle error using Material-UI Snackbar or similar
    }
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
          style={{
            marginBottom: "610px",
            display: "flex",
            marginLeft: "150px",
          }}
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
              <Grid item xs={12} sm={6}>
                {orderDetails.OrderStatus === "Completed" && (
                  <Link
                    to={`/customer-view-warranty/${orderDetails.ReportNo}`}
                  >
                    <Button variant="contained" color="primary">
                      View Warranty
                    </Button>
                  </Link>
                )}
              </Grid>
              {orderDetails.RequestWarranty !== null && (
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ color: "#616161", fontWeight: "bold" }}
                  >
                    Request Warranty
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: "1.125rem" }}>
                    {orderDetails.RequestWarranty}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                {orderDetails.RequestWarranty !== "Request" &&
                  orderDetails.OrderStatus === "Completed" &&
                  orderDetails.RequestWarranty !== "Assign" &&
                  orderDetails.RequestWarranty !== "Approved" &&
                  orderDetails.RequestWarranty !== "Processing" &&
                  orderDetails.RequestWarranty !== "Refused" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={updateRequestWarranty}
                    >
                      Request Warranty
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Paper>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarMessage}
          ContentProps={{
            style: {
              fontSize: "1.5rem", // Adjust the font size as needed
              backgroundColor: "#000", // Optional: Change background color
              color: "#fff", // Optional: Change text color
              textAlign: "center", // Align text to center
              minWidth: "50%", // Set minimum width to avoid overflowing content
              margin: "auto", // Center the snackbar horizontally
            },
          }}
          action={
            <React.Fragment>
              <IconButton
                size="medium"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                style={{ position: "absolute", right: 10, top: 10 }} // Adjust position of close button
              ></IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
}

export default HistoryOrderDetails;
