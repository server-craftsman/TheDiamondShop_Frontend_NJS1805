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
  Rating,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Descriptions, Modal } from "antd";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import FeedbackIcon from "@mui/icons-material/Feedback";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function HistoryOrderDetails() {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [feedbackStatus, setFeedbackStatus] = useState({});

  useEffect(() => {
    if (user && orderId) {
      fetchOrderDetails();
    }
  }, [user, orderId]);

  useEffect(() => {
    const savedFeedbackStatus = localStorage.getItem("feedbackStatus");
    if (savedFeedbackStatus) {
      setFeedbackStatus(JSON.parse(savedFeedbackStatus));
    }
  }, []);

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
      setOrder(data.order);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setSnackbarMessage("Failed to fetch order details.");
      setSnackbarOpen(true);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleClickSnackbar = () => setSnackbarOpen(true);

  const handleCloseSnackbar = (event, reason) => {
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
      fetchOrderDetails();
      setSnackbarMessage("Update Request Warranty successful");
      handleClick();
    } catch (error) {
      console.error("Update error:", error);
    }
  };


  const handleFeedbackSubmit = async () => {
    setFeedbackSubmitting(true);
    try {
      const token = user?.token;
      if (!token) throw new Error("Token not found in AuthContext");

      const orderDetail = order?.OrderDetails[0];
      if (!orderDetail?.OrderDetailID)
        throw new Error("OrderDetailID is missing");

      const feedbackData = {
        // orderDetailID: parseInt(orderDetail.OrderDetailID, 10),
        orderDetailID: parseInt(selectedDetail.OrderDetailID, 10),
        feedbackContent: feedback,
        rating: parseInt(rating, 10),
        // diamondId: order?.DiamondID || null,
        // bridalId: order?.BridalID || null,
        // diamondRingsId: order?.DiamondRingsID || null,
        // diamondTimepiecesId: order?.DiamondTimepiecesID || null,
        diamondId: selectedDetail.Product?.Diamond?.DiamondID || null,
        bridalId: selectedDetail.Product?.Bridal?.BridalID || null,
        diamondRingsId: selectedDetail.Product?.DiamondRings?.DiamondRingsID || null,
        diamondTimepiecesId: selectedDetail.Product?.DiamondTimepieces?.DiamondTimepiecesID || null,
      };

      const response = await axios.post(
        `http://localhost:8090/features/feedback`,
        feedbackData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 201)
        throw new Error(`HTTP error! Status: ${response.status}`);

      setSnackbarMessage("Feedback submitted successfully.");
      setFeedback("");
      setRating(0);
      setOpenModal(false);

      // Update feedback status displat green tick
      const newFeedbackStatus = {
        ...feedbackStatus,
        [selectedDetail.OrderDetailID]: true,
      };
      setFeedbackStatus(newFeedbackStatus);
      localStorage.setItem("feedbackStatus", JSON.stringify(newFeedbackStatus));


    } catch (error) {
      console.error("Feedback error:", error);
      setSnackbarMessage("Failed to submit feedback.");
    } finally {
      setFeedbackSubmitting(false);
      setSnackbarOpen(true);
    }
  };

  const handleOpenModal = (orderDetail) => {
    setSelectedDetail(orderDetail); // Store the selected detail in state
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setFeedback('');
    setRating(0);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!order) {
    return (
      <Typography variant="h5" color="error">
        No order details found.
      </Typography>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Order Summary Section */}
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          margin: "0px 0px 16px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{
            color: "#37474f",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Order Details
        </Typography>

        <Paper
          elevation={3}
          style={{
            padding: "24px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Order Summary
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Order ID:</Typography>
              <Typography variant="body1">{order.OrderID}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Order Date:</Typography>
              <Typography variant="body1">{order.OrderDate}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">First Name:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].FirstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Last Name:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].LastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Phone Number:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].PhoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Total Price:</Typography>
              <Typography variant="body1">{order.TotalPrice}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Delivery Address:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].DeliveryAddress}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Order Status:</Typography>
              <Typography variant="body1">
                {order.OrderStatus === "Completed" ? (
                  <span style={{ color: "green", margin: "50px 8px 0px 0px" }}>
                    <CheckCircleOutlineIcon />
                  </span>
                ) : (
                  <span style={{ color: "red", margin: "50px 8px 0px 0px" }}>
                    <ErrorOutlineIcon />
                  </span>
                )}
                {order.OrderStatus}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Shipping:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].Shipping}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Quantity:</Typography>
              <Typography variant="body1">{order.Quantity}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Attached Accessories:</Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].AttachedAccessories}
              </Typography>
              {/* {order.orderStatus === "Completed" || (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#595959",
                      opacity: 0.8,
                    },
                    margin: "8px 0px 0px 0px",
                    padding: "13px",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                  }}
                  onClick={handleOpenModal}
                >
                  Order Feedback
                </Button>
              )} */}
            </Grid>
          </Grid>
        </Paper>
        <Paper
          elevation={3}
          style={{
            padding: "24px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            backgroundColor: "#fdfbfb",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            marginTop: "15px",
          }}
        >
          <Typography
            style={{
              margin: "0px 0px 10px 0px",
              fontSize: "1.5rem",
              fontWeight: "bolder",
              color: "#000",
            }}
          >
            Warranty Information
          </Typography>
          <Grid container spacing={3} style={{ width: "100%" }}>
            {order.OrderDetails[0].RequestWarranty !== "Request" &&
              order.OrderStatus === "Completed" &&
              order.OrderDetails[0].RequestWarranty !== "Assign" &&
              order.OrderDetails[0].RequestWarranty !== "Approved" &&
              order.OrderDetails[0].RequestWarranty !== "Processing" &&
              order.OrderDetails[0].RequestWarranty !== "Refused" && (
                <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateRequestWarranty}
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      padding: "10px 20px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      borderRadius: "5px",
                    }}
                  >
                    <RequestPageIcon style={{ marginRight: "5px" }} /> Request
                    Warranty
                  </Button>
                </Grid>
              )}

            {order.OrderDetails[0].RequestWarranty !== null && (
              <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    marginRight: "210px",
                  }}
                >
                  Request Warranty: {order.OrderDetails[0].RequestWarranty}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
        <Modal open={openModal} onCancel={handleCloseModal} onOk={handleCloseModal}>
          <Box
            sx={{
              border: "1px solid",
              backgroundColor: "#fff",
              color: "#000",
              p: 3,
              borderRadius: 1,
              maxWidth: 600,
              mx: "auto",
              mt: 5,
              outline: 0,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              sx={{ fontSize: "1.5rem", fontWeight: "bolder" }}
            >
              Create Feedback
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} align="center">
                <Typography component="article">Your Feedback *</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                />
              </Grid>
              <Grid item xs={12} style={{backgroundColor: "#F2F2F2"}}>
                <TextField
                  label="Your comment *"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  multiline
                  rows={4}
                  variant="outlined"
                  style={{ color: "#fff" }}
                  fullWidth
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#F2F2F2",
                      },
                      "&:hover fieldset": {
                        borderColor: "#F2F2F2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#F2F2F2",
                      },
                      "& .MuiInputBase-input": {
                        color: "#000",
                      },
                      "& .MuiInputLabel-root": {
                        color: "#F2F2F2",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFeedbackSubmit}
                  disabled={feedbackSubmitting}
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#595959",
                      opacity: 0.8,
                    },
                  }}
                >
                  {feedbackSubmitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        <Button
          variant="contained"
          color="primary"
          aria-label="back"
          onClick={handleBack}
          style={{
            margin: "16px 630px 20px 0px",
            fontSize: "1.5rem",
            color: "#fff",
            backgroundColor: "#000",
          }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </div>

      {/* Order List Section */}
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
          margin: "0px 0px 0px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          style={{ color: "#37474f", fontWeight: "bold", textAlign: "center" }}
        >
          Order Details List
        </Typography>


        {order.OrderDetails.map((detail, index) => (
          <Paper
            key={index}
            elevation={3}
            style={{
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "16px",
              width: "100%",
              maxWidth: "800px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Order Detail {index + 1}
            </Typography>
            <Descriptions bordered column={1}>
              {detail.Product.Diamond && (
                <>
                  <Descriptions.Item label="Stock Number">
                    {detail.Product.Diamond.StockNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Carat Weight">
                    {detail.Product.Diamond.CaratWeight}
                  </Descriptions.Item>
                  <Descriptions.Item label="Diamond Origin">
                    {detail.Product.Diamond.DiamondOrigin}
                  </Descriptions.Item>
                  <Descriptions.Item label="Color">
                    {detail.Product.Diamond.Color}
                  </Descriptions.Item>
                  <Descriptions.Item label="Clarity">
                    {detail.Product.Diamond.Clarity}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cut">
                    {detail.Product.Diamond.Cut}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {detail.Product.Diamond.Price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shape">
                    {detail.Product.Diamond.Shape}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image">
                    <img
                      src={detail.Product.Diamond.Image}
                      alt="Diamond"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Number">
                    {detail.Product.Diamond.ReportNo || "-"}
                  </Descriptions.Item>
                </>
              )}
              {detail.Product.Bridal && (
                <>
                  <Descriptions.Item label="Bridal Style">
                    {detail.Product.Bridal.BridalStyle}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name Bridal">
                    {detail.Product.Bridal.NameBridal}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {detail.Product.Bridal.Category}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand Name">
                    {detail.Product.Bridal.BrandName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Material Name">
                    {detail.Product.Bridal.MaterialName || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ring Size Range">
                    {detail.Product.Bridal.RingSize || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Setting Type">
                    {detail.Product.Bridal.SettingType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {detail.Product.Bridal.Gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Weight">
                    {detail.Product.Bridal.Weight}
                  </Descriptions.Item>
                  <Descriptions.Item label="Center Diamond">
                    {detail.Product.Bridal.CenterDiamond}
                  </Descriptions.Item>
                  <Descriptions.Item label="Diamond Carat Range">
                    {detail.Product.Bridal.DiamondCaratRange}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Carat Weight">
                    {detail.Product.Bridal.TotalCaratWeight}
                  </Descriptions.Item>
                  <Descriptions.Item label="Total Diamond">
                    {detail.Product.Bridal.TotalDiamond}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {detail.Product.Bridal.Description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {detail.Product.Bridal.Price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Bridal">
                    <img
                      src={detail.Product.Bridal.ImageBridal}
                      alt="Bridal"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Brand">
                    <img
                      src={detail.Product.Bridal.ImageBrand}
                      alt="Brand"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Number">
                    {detail.Product.Bridal.ReportNo || "-"}
                  </Descriptions.Item>
                </>
              )}
              {detail.Product.DiamondTimepieces && (
                <>
                  <Descriptions.Item label="Timepieces Style">
                    {detail.Product.DiamondTimepieces.TimepiecesStyle}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name Timepieces">
                    {detail.Product.DiamondTimepieces.NameTimepieces}
                  </Descriptions.Item>
                  <Descriptions.Item label="Collection">
                    {detail.Product.DiamondTimepieces.Collection}
                  </Descriptions.Item>
                  <Descriptions.Item label="Water Resistance">
                    {detail.Product.DiamondTimepieces.WaterResistance}
                  </Descriptions.Item>
                  <Descriptions.Item label="Crystal Type">
                    {detail.Product.DiamondTimepieces.CrystalType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Bracelet Material">
                    {detail.Product.DiamondTimepieces.BraceletMaterial}
                  </Descriptions.Item>
                  <Descriptions.Item label="Case Size">
                    {detail.Product.DiamondTimepieces.CaseSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Dial Color">
                    {detail.Product.DiamondTimepieces.DialColor}
                  </Descriptions.Item>
                  <Descriptions.Item label="Movement">
                    {detail.Product.DiamondTimepieces.Movement}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {detail.Product.DiamondTimepieces.Gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {detail.Product.DiamondTimepieces.Category}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand Name">
                    {detail.Product.DiamondTimepieces.BrandName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {detail.Product.DiamondTimepieces.Description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {detail.Product.DiamondTimepieces.Price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Timepieces">
                    <img
                      src={detail.Product.DiamondTimepieces.ImageTimepieces}
                      alt="Timepieces"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Brand">
                    <img
                      src={detail.Product.DiamondTimepieces.ImageBrand}
                      alt="Brand"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Number">
                    {detail.Product.DiamondTimepieces.ReportNo || "-"}
                  </Descriptions.Item>
                </>
              )}
              {detail.Product.DiamondRings && (
                <>
                  <Descriptions.Item label="Ring Style">
                    {detail.Product.DiamondRings.RingStyle}
                  </Descriptions.Item>
                  <Descriptions.Item label="Name Rings">
                    {detail.Product.DiamondRings.NameRings}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {detail.Product.DiamondRings.Category}
                  </Descriptions.Item>
                  <Descriptions.Item label="Brand Name">
                    {detail.Product.DiamondRings.BrandName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Material Name">
                    {detail.Product.DiamondRings.MaterialName || "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ring Size">
                    {detail.Product.DiamondRings.RingSize}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {detail.Product.DiamondRings.Price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gender">
                    {detail.Product.DiamondRings.Gender}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {detail.Product.DiamondRings.Description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Rings">
                    <img
                      src={detail.Product.DiamondRings.ImageRings}
                      alt="Rings"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Image Brand">
                    <img
                      src={detail.Product.DiamondRings.ImageBrand}
                      alt="Brand"
                      width="100"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Number">
                    {detail.Product.DiamondRings.ReportNo || "-"}
                  </Descriptions.Item>
                </>
              )}
            </Descriptions>

            {/* code display Green tick */}
<Grid container spacing={2}>
  {order.OrderDetails.map((detail, detailIndex) => (
    <Grid item xs={12} key={detail.OrderDetailID} style={{ display: "flex", alignItems: "center" }}>
      <span>
        {detail.ProductName}
        {feedbackStatus[detail.OrderDetailID] && (
          <CheckCircleIcon style={{ color: "green", marginLeft: "8px" }} />
        )}
      </span>

      {order.OrderStatus === "Completed" && detailIndex === 0 && (
        <Grid container spacing={2} alignItems="center" style={{ marginTop: "20px" }}>
          <Grid item xs={6} style={{ textAlign: "left" }}>
            <Link to={`/customer-view-warranty/${detail.Warranty.ReportNo}`} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#333")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
              >
                <VisibilityIcon style={{ marginRight: "8px" }} /> Warranty Order
              </Button>
            </Link>
          </Grid>
        
          <Grid item xs={6} style={{ textAlign: "left" }}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    padding: "10px 20px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleOpenModal(detail)}
                >
                  <FeedbackIcon style={{ marginRight: "8px" }} /> Order Feedback
                </Button>
              </Grid>

        </Grid>
      )}
    </Grid>
  ))}
</Grid>

  </Paper>
))}

    </div>

      {/* Snackbar for feedback submission message */ }
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
    </div >
  );
}

export default HistoryOrderDetails;
