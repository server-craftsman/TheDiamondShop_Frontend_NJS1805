import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";
import {
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Button,
  IconButton,
  Snackbar,
  TextField,
  FormControl,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Descriptions } from "antd"; // Import Ant Design components

function HistoryOrderDetails() {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (user && orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = user?.token;

      if (!token) {
        throw new Error("Token not found in AuthContext");
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
      const details = Array.isArray(data.orderDetails)
        ? data.orderDetails
        : [data.orderDetails];
      setOrderDetails(details);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Fetch error:", error);
      setSnackbarMessage("Failed to fetch order details.");
      setSnackbarOpen(true);
    }
  };

  const handleCreateFeedback = async (event) => {
    event.preventDefault();

    try {
      if (!orderDetails.length) {
        throw new Error("Order details not available");
      }

      const feedback = {
        name,
        email,
        feedbackContent,
        rating,
        orderId,
        orderDetails,
      };

      const token = user?.token;
      if (!token) {
        throw new Error("Token not found in AuthContext");
      }

      const response = await axios.post(
        "http://localhost:8090/auth/create-feedback",
        feedback,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Feedback submitted successfully.");
      } else {
        throw new Error("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setSnackbarMessage("Failed to submit feedback.");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!orderDetails.length) {
    return (
      <Typography variant="h5" color="error">
        No order details found.
      </Typography>
    );
  }

  // Select the first order detail from the array
  const selectedOrderDetail = orderDetails[0];

  return (
    <>
      <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        <IconButton
          color="primary"
          aria-label="back"
          onClick={handleBack}
          style={{ marginBottom: "16px" }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: "#37474f", fontWeight: "bold" }}
        >
          Order Details
        </Typography>
        <Box mt={3}>
          <Paper elevation={3} style={{ padding: "24px", borderRadius: "8px" }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Order ID:</Typography>
                <Typography variant="body1">{selectedOrderDetail.OrderID}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Order Date:</Typography>
                <Typography variant="body1">{selectedOrderDetail.OrderDate}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">First Name:</Typography>
                <Typography variant="body1">{selectedOrderDetail.FirstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Last Name:</Typography>
                <Typography variant="body1">{selectedOrderDetail.LastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Phone Number:</Typography>
                <Typography variant="body1">{selectedOrderDetail.PhoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1">Total Price:</Typography>
                <Typography variant="body1">{selectedOrderDetail.TotalPrice}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Delivery Address:</Typography>
                <Typography variant="body1">{selectedOrderDetail.DeliveryAddress}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Order Status:</Typography>
                <Typography variant="body1">{selectedOrderDetail.OrderStatus}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Shipping:</Typography>
                <Typography variant="body1">{selectedOrderDetail.Shipping}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Quantity:</Typography>
                <Typography variant="body1">{selectedOrderDetail.Quantity}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Attached Accessories:</Typography>
                <Typography variant="body1">{selectedOrderDetail.AttachedAccessories}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mt={3}>
          <Typography variant="h4" gutterBottom>
            Order Details List
          </Typography>
          <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
            <Typography variant="h6" gutterBottom>
              Order Detail 1
            </Typography>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Stock Number">{selectedOrderDetail.Color}</Descriptions.Item>
              <Descriptions.Item label="Name Rings">{selectedOrderDetail.NameRings}</Descriptions.Item>
              <Descriptions.Item label="Name Bridal">{selectedOrderDetail.NameBridal}</Descriptions.Item>
              <Descriptions.Item label="Name Timepieces">{selectedOrderDetail.NameTimepieces}</Descriptions.Item>
              <Descriptions.Item label="Ring Size">{selectedOrderDetail.RingSize}</Descriptions.Item>
              <Descriptions.Item label="Material Name">{selectedOrderDetail.MaterialName}</Descriptions.Item>
              <Descriptions.Item label="Report No">{selectedOrderDetail.ReportNo}</Descriptions.Item>
            </Descriptions>
          </Paper>
        </Box>
      </div>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Submit Feedback
        </Typography>
        <Paper elevation={3} style={{ padding: "24px", borderRadius: "8px" }}>
          <form onSubmit={handleCreateFeedback}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Feedback"
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  icon={<StarIcon fontSize="inherit" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default HistoryOrderDetails;
