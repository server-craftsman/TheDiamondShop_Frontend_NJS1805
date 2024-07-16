import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

function HistoryOrderDetails() {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackContent, setFeedbackContent] = useState("");

  useEffect(() => {
    if (user && orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId]);
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
      setOrderDetails(data.orderDetails);
    } catch (error) {
      console.error("Fetch error:", error);
      setSnackbarMessage("Failed to fetch order details.");
      setSnackbarOpen(true);
    }
  };

  const handleCreateFeedback = async (event) => {
    event.preventDefault();
  
    try {
      if (!orderDetails) {
        throw new Error("Order details not available");
      }
  
      const { OrderDetailID, DiamondID, BridalID, DiamondRingsID, DiamondTimepiecesID } = orderDetails;
  
      const token = user?.token;
  
      const response = await axios.post(
        'http://localhost:8090/features/feedback',
        {
          orderDetailID: OrderDetailID,
          feedbackContent,
          rating,
          diamondId: DiamondID,
          bridalId: BridalID,
          diamondRingsId: DiamondRingsID,
          diamondTimepiecesId: DiamondTimepiecesID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        setSnackbarMessage("Feedback submitted successfully!");
      } else {
        setSnackbarMessage("Failed to submit feedback.");
      }
  
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error creating feedback:", error);
      setSnackbarMessage(`Failed to submit feedback. ${error.message}`);
      setSnackbarOpen(true);
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
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleBack = () => {
    navigate("/historyOrder-page");
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
      </div>

      {orderDetails && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 2,
              marginTop: "24px",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Thêm đánh giá
            </Typography>
            <form onSubmit={handleCreateFeedback}>
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <Typography
                  component="legend"
                  style={{ fontSize: "1.2rem", marginBottom: "8px" }}
                >
                  Đánh giá của bạn *
                </Typography>
                <Rating
                  name="rating"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                  precision={1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </FormControl>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={feedbackContent}
                onChange={(e) => setFeedbackContent(e.target.value)}
                label="Nhận xét của bạn *"
                variant="outlined"
                margin="normal"
                required
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                InputProps={{
                  style: {
                    color: "#fff",
                    backgroundColor: "#919191",
                  },
                }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Tên"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{
                    style: {
                      color: "#fff",
                      backgroundColor: "#919191",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{
                    style: {
                      color: "#fff",
                      backgroundColor: "#919191",
                    },
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#FFA500",
                  },
                }}
              >
                GỬI ĐI
              </Button>
            </form>
          </Box>
        </Grid>
      )}

      {/* <div>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
          />
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
          <Button variant="contained" color="primary" onClick={handleCreateFeedback}>
            Submit Feedback
          </Button>
        </div> */}

      {/* Snackbar for feedback submission message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
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
          <IconButton
            size="medium"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default HistoryOrderDetails;
