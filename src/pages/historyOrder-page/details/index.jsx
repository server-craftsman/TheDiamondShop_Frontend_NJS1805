
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Descriptions } from "antd";

function HistoryOrderDetails() {
  const { user } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
              <Typography variant="subtitle1">
                Attached Accessories:
              </Typography>
              <Typography variant="body1">
                {order.OrderDetails[0].AttachedAccessories}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              {order.OrderStatus === "Completed" && (
                <Link to={`/customer-view-warranty/${order.ReportNo}`}>
                  <Button variant="contained" color="primary">
                    View Warranty
                  </Button>
                </Link>
              )}
            </Grid>
            {order.RequestWarranty !== null && (
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="subtitle1"
                  style={{
                    color: "#616161",
                    fontWeight: "bold",
                  }}
                >
                  Request Warranty: {order.RequestWarranty}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    color: "#616161",
                    fontSize: "1.125rem",
                  }}
                >
                  {order.RequestWarranty}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              {order.RequestWarranty !== "Request" &&
                order.OrderStatus === "Completed" &&
                order.RequestWarranty !== "Assign" &&
                order.RequestWarranty !== "Approved" &&
                order.RequestWarranty !== "Processing" &&
                order.RequestWarranty !== "Refused" && (
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
        <Button
          variant="contained"
          color="primary"
          aria-label="back"
          onClick={handleBack}
          style={{
            margin: "16px 0px 16px 0px",
            fontSize: "1.5rem",
            display: "block",
          }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </div>


      {/* Order List Section */}
       <div style={{ maxWidth: "1000px", width: "100%", margin: "0px 0px 0px 0px", display: "flex", flexDirection: "column", alignItems: "center" }}>
         <Typography variant="h3"
          gutterBottom
          style={{ color: "#37474f", fontWeight: "bold", textAlign: "center" }}>
          Order Details List
        </Typography>
        {order.OrderDetails.map((detail, index) => (
          <Paper key={index} elevation={3} style={{ padding: "16px", borderRadius: "8px", marginBottom: "16px", width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
              Order Detail {index + 1}
            </Typography>
            <Descriptions bordered column={1}>
              {detail.Product.Diamond && (
                <>
                  <Descriptions.Item label="Stock Number">{detail.Product.Diamond.StockNumber}</Descriptions.Item>
                  <Descriptions.Item label="Carat Weight">{detail.Product.Diamond.CaratWeight}</Descriptions.Item>
                  <Descriptions.Item label="Diamond Origin">{detail.Product.Diamond.DiamondOrigin}</Descriptions.Item>
                  <Descriptions.Item label="Color">{detail.Product.Diamond.Color}</Descriptions.Item>
                  <Descriptions.Item label="Clarity">{detail.Product.Diamond.Clarity}</Descriptions.Item>
                  <Descriptions.Item label="Cut">{detail.Product.Diamond.Cut}</Descriptions.Item>
                  <Descriptions.Item label="Price">{detail.Product.Diamond.Price}</Descriptions.Item>
                  <Descriptions.Item label="Shape">{detail.Product.Diamond.Shape}</Descriptions.Item>
                  <Descriptions.Item label="Image"><img src={detail.Product.Diamond.Image} alt="Diamond" width="100" /></Descriptions.Item>
                </>
              )}
              {detail.Product.Bridal && (
                <>
                  <Descriptions.Item label="Bridal Style">{detail.Product.Bridal.BridalStyle}</Descriptions.Item>
                  <Descriptions.Item label="Name Bridal">{detail.Product.Bridal.NameBridal}</Descriptions.Item>
                  <Descriptions.Item label="Category">{detail.Product.Bridal.Category}</Descriptions.Item>
                  <Descriptions.Item label="Brand Name">{detail.Product.Bridal.BrandName}</Descriptions.Item>
                  <Descriptions.Item label="Material Name">{detail.Product.Bridal.MaterialName || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Ring Size Range">{detail.Product.Bridal.RingSize || "-"}</Descriptions.Item>
                  <Descriptions.Item label="Setting Type">{detail.Product.Bridal.SettingType}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{detail.Product.Bridal.Gender}</Descriptions.Item>
                  <Descriptions.Item label="Weight">{detail.Product.Bridal.Weight}</Descriptions.Item>
                  <Descriptions.Item label="Center Diamond">{detail.Product.Bridal.CenterDiamond}</Descriptions.Item>
                  <Descriptions.Item label="Diamond Carat Range">{detail.Product.Bridal.DiamondCaratRange}</Descriptions.Item>
                  <Descriptions.Item label="Total Carat Weight">{detail.Product.Bridal.TotalCaratWeight}</Descriptions.Item>
                  <Descriptions.Item label="Total Diamond">{detail.Product.Bridal.TotalDiamond}</Descriptions.Item>
                  <Descriptions.Item label="Description">{detail.Product.Bridal.Description}</Descriptions.Item>
                  <Descriptions.Item label="Price">{detail.Product.Bridal.Price}</Descriptions.Item>
                  <Descriptions.Item label="Image Bridal"><img src={detail.Product.Bridal.ImageBridal} alt="Bridal" width="100" /></Descriptions.Item>
                  <Descriptions.Item label="Image Brand"><img src={detail.Product.Bridal.ImageBrand} alt="Brand" width="100" /></Descriptions.Item>
                </>
              )}
              {detail.Product.DiamondTimepieces && (
                <>
                  <Descriptions.Item label="Timepieces Style">{detail.Product.DiamondTimepieces.TimepiecesStyle}</Descriptions.Item>
                  <Descriptions.Item label="Name Timepieces">{detail.Product.DiamondTimepieces.NameTimepieces}</Descriptions.Item>
                  <Descriptions.Item label="Collection">{detail.Product.DiamondTimepieces.Collection}</Descriptions.Item>
                  <Descriptions.Item label="Water Resistance">{detail.Product.DiamondTimepieces.WaterResistance}</Descriptions.Item>
                  <Descriptions.Item label="Crystal Type">{detail.Product.DiamondTimepieces.CrystalType}</Descriptions.Item>
                  <Descriptions.Item label="Bracelet Material">{detail.Product.DiamondTimepieces.BraceletMaterial}</Descriptions.Item>
                  <Descriptions.Item label="Case Size">{detail.Product.DiamondTimepieces.CaseSize}</Descriptions.Item>
                  <Descriptions.Item label="Dial Color">{detail.Product.DiamondTimepieces.DialColor}</Descriptions.Item>
                  <Descriptions.Item label="Movement">{detail.Product.DiamondTimepieces.Movement}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{detail.Product.DiamondTimepieces.Gender}</Descriptions.Item>
                  <Descriptions.Item label="Category">{detail.Product.DiamondTimepieces.Category}</Descriptions.Item>
                  <Descriptions.Item label="Brand Name">{detail.Product.DiamondTimepieces.BrandName}</Descriptions.Item>
                  {/* <Descriptions.Item label="Dial Type">{detail.Product.DiamondTimepieces.DialType}</Descriptions.Item> */}
                  <Descriptions.Item label="Description">{detail.Product.DiamondTimepieces.Description}</Descriptions.Item>
                  <Descriptions.Item label="Price">{detail.Product.DiamondTimepieces.Price}</Descriptions.Item>
                  <Descriptions.Item label="Image Timepieces"><img src={detail.Product.DiamondTimepieces.ImageTimepieces} alt="Timepieces" width="100" /></Descriptions.Item>
                  <Descriptions.Item label="Image Brand"><img src={detail.Product.DiamondTimepieces.ImageBrand} alt="Brand" width="100" /></Descriptions.Item>
                </>
              )}
              {detail.Product.DiamondRings && (
                <>
                  <Descriptions.Item label="Ring Style">{detail.Product.DiamondRings.RingStyle}</Descriptions.Item>
                  <Descriptions.Item label="Name Rings">{detail.Product.DiamondRings.NameRings}</Descriptions.Item>
                  <Descriptions.Item label="Category">{detail.Product.DiamondRings.Category}</Descriptions.Item>
                  <Descriptions.Item label="Brand Name">{detail.Product.DiamondRings.BrandName}</Descriptions.Item>
                  <Descriptions.Item label="Material Name">{detail.Product.DiamondRings.MaterialName || "-"}</Descriptions.Item>
                  {/* <Descriptions.Item label="Center Gemstone">{detail.Product.DiamondRings.CenterGemstone}</Descriptions.Item>
                <Descriptions.Item label="Center Gemstone Shape">{detail.Product.DiamondRings.CenterGemstoneShape}</Descriptions.Item> */}
                  {/* <Descriptions.Item label="Width">{detail.Product.DiamondRings.Width}</Descriptions.Item>
                <Descriptions.Item label="Center Diamond Dimension">{detail.Product.DiamondRings.CenterDiamondDimension}</Descriptions.Item>
                <Descriptions.Item label="Weight">{detail.Product.DiamondRings.Weight}</Descriptions.Item>
                <Descriptions.Item label="Gemstone Weight">{detail.Product.DiamondRings.GemstoneWeight}</Descriptions.Item> */}
                  {/* <Descriptions.Item label="Center Diamond Color">{detail.Product.DiamondRings.CenterDiamondColor}</Descriptions.Item>
                <Descriptions.Item label="Center Diamond Clarity">{detail.Product.DiamondRings.CenterDiamondClarity}</Descriptions.Item>
                <Descriptions.Item label="Center Diamond Carat Weight">{detail.Product.DiamondRings.CenterDiamondCaratWeight}</Descriptions.Item> */}
                  <Descriptions.Item label="Ring Size">{detail.Product.DiamondRings.RingSize}</Descriptions.Item>
                  <Descriptions.Item label="Price">{detail.Product.DiamondRings.Price}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{detail.Product.DiamondRings.Gender}</Descriptions.Item>
                  {/* <Descriptions.Item label="Fluorescence">{detail.Product.DiamondRings.Fluorescence}</Descriptions.Item> */}
                  <Descriptions.Item label="Description">{detail.Product.DiamondRings.Description}</Descriptions.Item>
                  <Descriptions.Item label="Image Rings"><img src={detail.Product.DiamondRings.ImageRings} alt="Rings" width="100" /></Descriptions.Item>
                  <Descriptions.Item label="Image Brand"><img src={detail.Product.DiamondRings.ImageBrand} alt="Brand" width="100" /></Descriptions.Item>
                </>
              )}
            </Descriptions>
          </Paper>
        ))}
      </div>

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
    </div>
  );
}

export default HistoryOrderDetails;

