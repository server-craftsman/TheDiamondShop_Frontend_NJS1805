import React, { useState, useEffect, useContext } from "react";
import axios from "../login-page/axios-instance/index";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Link, useLocation } from "react-router-dom";
import { Image, Result } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useCart } from "../../CartContext";
import { AuthContext } from "../../AuthContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
// import QRCode from "qrcode.react";
import "./index.scss";
import ErrorDialog from "../../FailOrder"; // Import the ErrorDialog component

const OrderForm = () => {
  const location = useLocation();
  const {
    cart = [],
    diamond,
    ring,
    bridal,
    timepieces,
    totalPrice: initialTotalPrice,
  } = location.state;

  const { user } = useContext(AuthContext);

  const [orderData, setOrderData] = useState({
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    // deliveryAddress: "",
    // shippingMethod: "Express",
    // paymentMethod: "",

    deliveryAddress: '',

    shippingMethod: "Express",
    paymentMethod: "Cash on Delivery",
    // DiamondRingsMaterials: [],
    // DiamondRingSizes: [],
    // BridalsSizes: [],
    // BridalsMaterials: [],
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [eligibleVouchers, setEligibleVouchers] = useState([]);
  const [enteredVoucherName, setEnteredVoucherName] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(10);
  // const [showPayPalForm, setShowPayPalForm] = useState(false);

  // const [qrCodeData, setQrCodeData] = useState(null);
  // const [paypalOrderId, setPaypalOrderId] = useState(null);
  // PayPal
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (initialTotalPrice !== null && typeof initialTotalPrice === "number") {
      setTotalPrice(initialTotalPrice.toFixed(2));
    } else {
      setTotalPrice("0.00");
    }

    loadPayPalScript()
      .then(() => {
        console.log("PayPal SDK loaded successfully.");
      })
      .catch((err) => {
        console.error("Failed to load PayPal SDK:", err);
      });

    // Fetch eligible vouchers on component mount
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("/vouchers/");
        setEligibleVouchers(response.data);
      } catch (error) {
        setError("Failed to fetch vouchers. Please try again.");
        setErrorDialogOpen(true); // Open error dialog
      }
    };

    fetchVouchers();
  }, [initialTotalPrice]);

  const loadPayPalScript = () => {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=ATsGZqbqx2kZEsZj4L6hi_Bbez0lX6gP8Tek64uRuk4WQVXSQZabHX-Uj1pSHzq2iiYGmF7Hqa6zWWgf";
      script.onload = () => {
        if (window.paypal) {
          setSdkReady(true);
          resolve();
        } else {
          reject(new Error("PayPal SDK could not be loaded."));
        }
      };
      script.onerror = () =>
        reject(new Error("PayPal SDK could not be loaded."));
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (user) {
      fetchOrderData();
    }
  }, [user]);

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const token = user?.token;

      if (!token) {
        console.error("Token not found in AuthContext");
        setLoading(false);
        return;
      }

      console.log("Fetching user profile with token:", token);

      const response = await axios.get(
        "http://localhost:8090/features/view-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Fetch response status:", response.status);

      if (response.status === 200) {
        const userData = response.data.user;
        setOrderData({
          firstName: userData.FirstName,
          lastName: userData.LastName,
          phoneNumber: userData.PhoneNumber,
          deliveryAddress: userData.Address,
          shippingMethod: "Express",
          paymentMethod: "Cash on Delivery",
          // deliveryAddress: '',
          // AttachedAccessories: '',
          // shippingMethod: "Express",
          // paymentMethod: '',
          // DiamondRingsMaterials: [],
          // DiamondRingSizes: [],
          // BridalsSizes: [],
          // BridalsMaterials: [],
          // firstName: '',
          // lastName: '',
          // phoneNumber: '',
        });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };


  // Function to filter and set eligible vouchers based on entered name
  const handleFilterVouchers = () => {
    const filteredVouchers = eligibleVouchers.filter((voucher) =>
      voucher.VoucherName.toLowerCase().includes(
        enteredVoucherName.toLowerCase()
      )
    );
    return filteredVouchers;
  };

  const handleApplyVoucher = () => {
    if (selectedVoucher && initialTotalPrice !== null) {
      const discount = selectedVoucher.Discount / 100;
      const newDiscountedPrice = initialTotalPrice * discount;
      const newTotalPrice = initialTotalPrice - newDiscountedPrice;

      setDiscountedPrice(newDiscountedPrice.toFixed(2));
      setTotalPrice(newTotalPrice.toFixed(2));
    } else {
      setDiscountedPrice(null);
      setTotalPrice(initialTotalPrice.toFixed(2));
    }
  };

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("User token not found. Please log in again.");
      }

      // Prepare order items based on item type
      const orderItems = cart.map((item, index) => {
        const orderItem = {
          Quantity: item.quantity,
          Price: item.price,
          key: index, // Add a unique key prop
        };

        if (item.type === "Diamond") {
          orderItem.DiamondID = item.id;
          orderItem.DiamondName = item.name;
          orderItem.DiamondColor = item.color;
          orderItem.DiamondClarity = item.clarity;
          orderItem.DiamondCarat = item.caratWeight;
          orderItem.DiamondDetails = diamond; // Assuming diamond details are passed separately
          orderItem.DiamondOrigin = item.diamondOrigin;
        } else if (item.type === "DiamondRings") {
          const uniqueDiamondRingsIDs = Array.isArray(item.id) ? Array.from(new Set(item.id)) : [item.id];
          const materials = Array.isArray(item.materialID) ? Array.from(new Set(item.materialID)) : [item.materialID];
          const ringSizes = Array.isArray(item.ringSizeID) ? Array.from(new Set(item.ringSizeID)) : [item.ringSizeID];

          orderItem.RingDetails = ring; // Assuming ring details are passed separately
          orderItem.DiamondRingsID = uniqueDiamondRingsIDs;
          orderItem.RingSize = ringSizes;
          orderItem.Material = materials;
          orderItem.NameRings = item.name;
        } else if (item.type === "Bridal") {
          // Ensure BridalID, Material, RingSizeRang are arrays
          const uniqueBridalIDs = Array.isArray(item.id) ? Array.from(new Set(item.id)) : [item.id];
          const materials = Array.isArray(item.materialID) ? Array.from(new Set(item.materialID)) : [item.materialID];
          const ringSizes = Array.isArray(item.ringSizeID) ? Array.from(new Set(item.ringSizeID)) : [item.ringSizeID];

          orderItem.BridalDetails = bridal;
          orderItem.BridalID = uniqueBridalIDs;
          orderItem.NameBridal = item.name;
          orderItem.Material = materials;
          orderItem.RingSizeRang = ringSizes;
          orderItem.BridalQuantity = item.quantity;
          orderItem.Category = item.Category;
        } else if (item.type === "DiamondTimepieces") {
          orderItem.TimepiecesDetails = timepieces;
          orderItem.DiamondTimepiecesID = item.id;
          orderItem.NameTimepieces = item.name;
          orderItem.CrystalType = item.crystalType;
          orderItem.CaseSize = item.caseSize;
          orderItem.timepiecesStyle = item.timepiecesStyle;
          orderItem.TimepiecesQuantity = item.quantity;
        }

        return orderItem;
      });

      const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Determine ProductType based on cart contents, default to "Diamond"
      let productType = "Diamond";

      // Construct order data object
      const orderDataPayload = {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        phoneNumber: orderData.phoneNumber,
        address: orderData.address,
        deliveryAddress: orderData.deliveryAddress,
        shippingMethod: orderData.shippingMethod,
        paymentMethod: orderData.paymentMethod,


      };

      const orderPayload = {
        orderData: {
          ...orderDataPayload,
          DiamondID:
            cart
              .filter((item) => item.type === "Diamond")
              .map((item) => item.id) || [],
          DiamondRingsID:
            cart
              .filter((item) => item.type === "DiamondRings")
              .map((item) => Array.isArray(item.id) ? Array.from(new Set(item.id)) : [item.id]) || [],
          BridalID:
            cart
              .filter((item) => item.type === "Bridal")
              .flatMap((item) => Array.isArray(item.id) ? Array.from(new Set(item.id)) : [item.id]) || [],
          DiamondTimepiecesID:
            cart
              .filter((item) => item.type === "DiamondTimepieces")
              .map((item) => item.id) || [],
          ProductType: productType,
          Quantity: quantity,
          TotalPrice: parseFloat(totalPrice.toFixed(2)), // Ensure total price is formatted properly
          VoucherID: selectedVoucher ? selectedVoucher.VoucherID : null,
          Shipping: orderData.shippingMethod,
          PaymentMethod: orderData.paymentMethod,
          OrderItems: orderItems,
          DeliveryAddress: orderDataPayload.deliveryAddress,
          FirstName: orderDataPayload.firstName,
          LastName: orderDataPayload.lastName,
          PhoneNumber: orderDataPayload.phoneNumber,
          BridalsSizes: cart
            .filter((item) => item.type === "Bridal")
            .flatMap((item) => Array.isArray(item.ringSizeID) ? Array.from(new Set(item.ringSizeID)) : [item.ringSizeID]) || [],
          BridalsMaterials: cart
            .filter((item) => item.type === "Bridal")
            .flatMap((item) => Array.isArray(item.materialID) ? Array.from(new Set(item.materialID)) : [item.materialID]) || [],
          DiamondRingsMaterials: cart
            .filter((item) => item.type === "DiamondRings")
            .flatMap((item) => Array.isArray(item.ringSizeID) ? Array.from(new Set(item.ringSizeID)) : [item.ringSizeID]) || [],
          DiamondRingSizes: cart
            .filter((item) => item.type === "DiamondRings")
            .flatMap((item) => Array.isArray(item.materialID) ? Array.from(new Set(item.materialID)) : [item.materialID]) || [],
        },
      };

      // Check if any required fields are missing
      if (
        !orderPayload.orderData.firstName ||
        !orderPayload.orderData.lastName ||
        !orderPayload.orderData.phoneNumber ||
        !orderPayload.orderData.deliveryAddress ||
        !orderPayload.orderData.shippingMethod ||
        !orderPayload.orderData.paymentMethod

      ) {
        throw new Error("Please fill out all required fields.");
      }

      const response = await axios.post(
        "http://localhost:8090/orders/create",
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order created successfully:", response.data);
      setSuccess(true);
      setOrderSubmitted(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please try again.");
      setErrorDialogOpen(true); // Open error dialog
      // Log Axios error response for debugging
      if (error.response) {
        console.log("Error details:", error.response);
      }
    } finally {
      setLoading(false);
    }
  };

  // const handlePaymentMethodChange = (event) => {
  //   const selectedPaymentMethod = event.target.value;
  //   setOrderData((prevData) => ({
  //     ...prevData,
  //     paymentMethod: selectedPaymentMethod,
  //   }));
  // };
  const handlePaymentMethodChange = (e) => {
    const { name, value } = e.target;

    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setOrderSubmitted(false); // options
  };

  const handleCloseErrorModal = () => {
    // setError("");
    setOrderSubmitted(false);
    setErrorDialogOpen(false);
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
    setOrderSubmitted(false);
    window.location.href = "/diamond-page";
  };

  // const handleInputChange = (e) => {
  //   const target = e.target;

  // if (!target) {
  //   console.error("Event target is undefined");
  //   return;
  // }

  // const { name, value } = target;
  //   // const { name, value } = e.target;

  //   // if (name === "shippingMethod") {
  //   //   const cost = value === "Standard" ? 5 : 10;
  //   //   setShippingCost(cost);

  //     let newTotalPrice =
  //       initialTotalPrice - (discountedPrice ? discountedPrice : 0) + cost;
  //     setTotalPrice(newTotalPrice.toFixed(2));
  //   }

  //======================================
  // const handleInputChange = (e) => {
  //   console.log("Event:", e);
  //   const target = e.target;
  //   console.log("Target:", target);

  //   if (!target) {
  //     console.error("Event target is undefined");
  //     return;
  //   }

  //   const { name, value } = target;
  //   console.log("Name:", name, "Value:", value);

  //   if (name === "shippingMethod") {
  //     const cost = value === "Standard" ? 5 : 10;
  //     setShippingCost(cost);

  //     let newTotalPrice =
  //       initialTotalPrice - (discountedPrice ? discountedPrice : 0) + cost;
  //     setTotalPrice(newTotalPrice.toFixed(2));
  //   }
  //   //=======================================

  //   // Update orderData state
  //   setOrderData({
  //     ...orderData,
  //     [name]: value,

  //   });
  // };

  const handleInputChange = (e) => {
    console.log("Event:", e);
    const target = e.target;
    console.log("Target:", target);

    if (!target) {
      console.error("Event target is undefined");
      return;
    }

    const { name, value } = target;
    console.log("Name:", name, "Value:", value);

    // Handle specific input changes (e.g., shipping method)
    if (name === "shippingMethod") {
      const cost = value === "Standard" ? 5 : 10;
      setShippingCost(cost);

      let newTotalPrice =
        initialTotalPrice - (discountedPrice ? discountedPrice : 0) + cost;
      setTotalPrice(newTotalPrice.toFixed(2));
    }

    // Update orderData state
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  // const handleDeliveryAddressChange = (value) => {
  //   setOrderData({
  //     ...orderData,
  //     deliveryAddress: value,
  //   });
  // };

  // const handleInputChangeTotalPrice = (e) => {
  //   setTotalPrice(parseFloat(e.target.value));
  // };

  return (
    <>
      <Box
        className="max-w-screen-md mx-auto p-6 bg-white shadow-md rounded-lg"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap={20}
        boxShadow="5px 8px 200px rgba(0, 0, 0, 0.1)"
        borderRadius={16}
        margin="120px 20px 20px 30px"
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            style={{
              textAlign: "center",
              // background: "linear-gradient(to right, #007BFF 0%, #00BFFF 100%)",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              // fontWeight: "900",
              // textTransform: "uppercase",
              fontSize: "2.5em",
              fontStyle: "normal",
              color: "#000000"
            }}
          >
            Delivery Information
          </Typography>
          <Divider />
          <Box component="form" mt={3} marginLeft={3} borderRadius={16}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="First Name"
                    id="FirstName"
                    name="firstName"
                    value={orderData.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        color: "#414141",
                        background: "#F0F0F0",
                        borderRadius: 8,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "#333",
                        '&.Mui-focused': {
                          color: "#D3D3D3",
                        },
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Last Name"
                    id="LastName"
                    name="lastName"
                    value={orderData.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        color: "#414141",
                        background: "#F0F0F0",
                        borderRadius: 8,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "#333",
                        '&.Mui-focused': {
                          color: "#D3D3D3",
                        },
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Phone Number"
                    id="PhoneNumber"
                    name="phoneNumber"
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={orderData.phoneNumber}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      sx: {
                        color: "#414141",
                        background: "#F0F0F0",
                        borderRadius: 8,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "#333",
                        '&.Mui-focused': {
                          color: "#D3D3D3",
                        },
                      },
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="deliveryAddress"
                  label="Delivery Address"
                  fullWidth
                  value={orderData.deliveryAddress || ''}
                  onChange={handleInputChange}
                  InputProps={{
                    sx: {
                      color: "#414141",
                      background: "#F0F0F0",
                      borderRadius: 8,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "#333",
                      '&.Mui-focused': {
                        color: "#D3D3D3",
                      },
                    },
                  }}
                />
              </Grid>

              <Card
                sx={{ minWidth: 800 }}
                style={{ marginLeft: "25px", marginTop: "20px" }}
              >
                <CardContent>
                  <Typography variant="h6" component="div" fontWeight="bold" color={"#000"}>
                    <FaMapMarkerAlt /> {orderData.firstName}{" "}
                    {orderData.lastName} - {orderData.phoneNumber}
                  </Typography>

                  <Typography variant="body1" marginTop="5px" color={"#000"}>
                    {orderData.deliveryAddress}
                  </Typography>
                </CardContent>
              </Card>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginBottom: "1em",
                      color: "#000",
                      fontStyle: "italic",
                      fontWeight: "bold",
                    }}
                  >
                    Shipping Method:
                  </Typography>
                  <RadioGroup
                    row
                    name="shippingMethod"
                    value={orderData.shippingMethod}
                    // onChange={(e) =>
                    //   handleInputChange("shippingMethod", e.target.value)
                    // }
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Standard"
                      control={<Radio color="primary" />}
                      label={
                        <>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lE_H2kH56DyLMDf24J74ikHRUaJwFMiQUA&s"
                            alt="Standard"
                            style={{ width: 130, height: 100 }}
                          />
                          <Typography color="#000" fontWeight={"bolder"}>
                            Standard Shipping($5)
                          </Typography>
                        </>
                      }
                    />
                    <FormControlLabel
                      value="Express"
                      control={<Radio color="primary" />}
                      label={
                        <>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaNyC0p4bhF9wa0FJPoVxs4dbhDhl-gwGSBQ&s"
                            alt="Express"
                            style={{ width: 130, height: 100 }}
                          />
                          <Typography color="#000" fontWeight={"bolder"}>
                            Express Shipping($10)
                          </Typography>
                        </>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography
                    variant="subtitle1"
                    color="#077BFF"
                    fontStyle="italic"
                    fontWeight="bold"
                  >
                    Payment Method:
                  </Typography>
                  <RadioGroup
                    value={orderData.paymentMethod}
                    onChange={(e) =>
                      setOrderData({
                        ...orderData,
                        paymentMethod: e.target.value,
                      })
                    }
                  >
                    <FormControlLabel
                      value="Cash"
                      control={<Radio />}
                      label="Cash on Delivery"
                    />
                    <FormControlLabel
                      value="PayPal"
                      control={<Radio />}
                      label="PayPal"
                      id="paypal-button-container"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid> */}

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <Typography component="legend" style={{
                    marginBottom: "1em",
                    color: "#000",
                    fontStyle: "italic",
                    fontWeight: "bold",
                  }}>Payment Method</Typography>
                  <RadioGroup
                    aria-label="paymentMethod"
                    name="paymentMethod"
                    value={orderData.paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label="Cash on Delivery"
                      style={{ color: "#000", fontWeight: "bolder" }}
                    />
                    {/* <FormControlLabel
                      value="PayPal"
                      control={<Radio />}
                      label="PayPal"
                      style={{ color: "#000", fontWeight: "bolder" }}
                    /> */}
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <Typography variant="h6">Total Price: ${totalPrice}</Typography>
              </Grid> */}
            </Grid>
          </Box>
          <Grid container spacing={3} mt={3} marginLeft={5} marginTop={7}>
            <Grid item>
              {/* <Button
                variant="outlined"
                color="primary"
                style={{
                  fontSize: "1.5em",
                  padding: "10px 20px",
                  boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.2)",
                }}
              >
                <Link
                  to="/cart-page"
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "bold",
                  }}
                >
                  Cart
                </Link>
              </Button> */}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmOrder}
                disabled={loading}
                style={{
                  textTransform: "capitalize",
                  borderRadius: 8,
                  fontSize: "1.5em",
                  padding: "10px 20px",
                  boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.2)",
                  margin: "0px 50px 30px 0px",
                  backgroundColor: "#000"
                }}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </Grid>

            <Dialog
              open={isModalOpen}
              onClose={handleModalClose}
              aria-labelledby="order-success-dialog"
              style={{
                maxWidth: "650px",
                height: "540px",
                margin: "200px auto",
                borderRadius: "100px",
              }}
            >
              <DialogTitle
                id="order-success-dialog"
                style={{
                  textAlign: "center",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "#3c763d",
                  marginTop: "20px",
                }}
              >
                Your order has been successfully placed!
              </DialogTitle>
              <DialogContent
                style={{
                  margin: "-40px 0",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {orderSubmitted && (
                  <Result
                    status="success"
                    title="Order placed successfully!"
                    subTitle="Thank you for your purchase."
                    extra={[]}
                  />
                )}
                {error && (
                  <Result
                    status="error"
                    title="Order Failed"
                    subTitle="An error occurred while placing your order. Please try again."
                    extra={[
                      <Button
                        key="close-error"
                        variant="contained"
                        color="primary"
                        onClick={handleCloseErrorModal}
                      >
                        Close
                      </Button>,
                    ]}
                  />
                )}
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <Button
                  key="continue-shopping"
                  variant="contained"
                  color="primary"
                  onClick={handleContinueShopping}
                  style={{
                    borderRadius: "4rem",
                    fontSize: "1.3rem",
                    backgroundColor: "#3c763d",
                    color: "#FFFFFF",
                    margin: "0 35px 0 8px",
                    padding: "0.5rem 1.5rem",
                  }}
                >
                  Continue Shopping
                </Button>
                ,
                <Button
                  type="default"
                  key="back-home"
                  href="/"
                  onClick={handleModalClose}
                  style={{
                    backgroundColor: "#3c763d",
                    color: "#FFFFFF",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "2.5rem", // Làm tròn các góc của nút
                    fontSize: "1.3rem",
                    marginRight: "15px",
                  }}
                >
                  Back to Home
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Box>
        <Box marginRight={2}>
          <Typography
            variant="h4"
            component="h2"
            style={{
              textAlign: "center",
              // background: "linear-gradient(to right, #007BFF 0%, #00BFFF 100%)",
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              // fontWeight: "900",
              // textTransform: "uppercase",
              fontSize: "2.5em",
              color: "#000",
              fontStyle: "normal"
            }}
          >
            Order Details
          </Typography>
          <TableContainer component={Paper} mt={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bolder",
                      fontSize: "20px",
                      paddingLeft: "180px",
                      color: "#000"
                    }}
                  >
                    Product
                  </TableCell>
                  {/* <TableCell
                    align="right"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "20px",
                      paddingRight: "40px",
                      color: "#FF1471"
                    }}
                  >
                    Quantity
                  </TableCell> */}
                  <TableCell
                    align="right"
                    style={{
                      fontWeight: "bolder",
                      fontSize: "20px",
                      marginRight: "200px",
                      color: "#000"
                    }}
                  >
                    Origin Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ margin: "0 10px" }}>
                {cart.length > 0 ? (
                  cart.map((item, index) => (
                    <TableRow key={`${item.id}-${index}`}>
                      <TableCell style={{ fontWeight: "bold" }}>
                        <div className="product-info">
                          <Image
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                              marginRight: "50px",
                            }}
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                          />
                          {item.type === "Diamond" && (
                            <div className="diamond-details">
                              <Typography className="product-title" color={"#3393FF"} fontWeight={"bold"}>
                                Diamond
                              </Typography>
                              <div className="product-detail">
                                <strong>Stock Number:</strong>{" "}
                                {item.stockNumber}
                              </div>
                              <div className="product-detail">
                                <strong>Carat Weight:</strong>{" "}
                                {item.caratWeight} ct
                              </div>
                              <div className="product-detail">
                                <strong>Color:</strong> {item.color}
                              </div>
                              <div className="product-detail">
                                <strong>Clarity:</strong> {item.clarity}
                              </div>
                              <div className="product-detail">
                                <strong>Cut:</strong> {item.cut}
                              </div>
                            </div>
                          )}
                          {item.type === "DiamondRings" && (
                            <div className="ring-details">
                              <Typography className="product-title" color={"#3393FF"} fontWeight={"bold"}>
                                Diamond Rings
                              </Typography>
                              <Typography className="product-title" color={"#333"} fontWeight={"bold"}>
                                {item.name}
                              </Typography>
                              <div className="product-detail" color={"#333"} fontWeight={"bold"}>
                                <strong>Category:</strong> {item.category}
                              </div>
                              <div className="product-detail" color={"#333"} fontWeight={"bold"}>
                                <strong>Material:</strong> {item.material}
                              </div>
                              <div className="product-detail" color={"#333"} fontWeight={"bold"}>
                                <strong>Size:</strong> {item.ringSize}
                              </div>
                            </div>
                          )}
                          {item.type === "Bridal" && (
                            <div className="bridal-details">
                              <Typography className="product-title" color={"#3393FF"} fontWeight={"bold"}>
                                Bridal
                              </Typography>
                              <Typography className="product-title" fontWeight={"bold"}>
                                {item.name}
                              </Typography>
                              <div className="product-detail">
                                <strong>Material:</strong> {item.material}
                              </div>
                              <div className="product-detail">
                                <strong>Category:</strong> {item.category}
                              </div>
                              <div className="product-detail">
                                <strong>Size:</strong> {item.ringSize}
                              </div>
                            </div>
                          )}
                          {item.type === "DiamondTimepieces" && (
                            <div className="timepieces-details">
                              <Typography className="product-title" color={"#3393FF"} fontWeight={"bold"}>
                                Diamond Timepieces
                              </Typography>
                              <Typography className="product-title" fontWeight={"bold"}>
                                {item.name}
                              </Typography>
                              <div className="product-detail">
                                <strong>Timepieces Style:</strong>{" "}
                                {item.timepiecesStyle}
                              </div>
                              <div className="product-detail">
                                <strong>Crystal Type:</strong>{" "}
                                {item.crystalType}
                              </div>
                              <div className="product-detail">
                                <strong>Case Size:</strong> {item.caseSize}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      {/* <TableCell
                        style={{ fontWeight: "bold", paddingLeft: "50px" }}
                      >
                        {item.quantity}
                      </TableCell> */}
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: "20px",
                          paddingRight: "20px",
                        }}
                      >
                        {item.price}$
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="empty-cart">
                    <TableCell colSpan={3} align="center">
                      No items in the cart.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" mt={3} mb={2}>
            <Box flex={1}>
              <Typography
                variant="h4"
                component="h2"
                color="#000"
                fontWeight="bold"
              >
                Eligible Vouchers
              </Typography>
              <div>
                {/* <TextField
                  label="Enter Voucher Name"
                  value={enteredVoucherName}
                  onChange={handleVoucherNameChange}
                  fullWidth
                  margin="normal"
                /> */}

                {/* InputProps={{
                      sx: {
                        color: "#414141",
                        background: "#F0F0F0",
                        borderRadius: 8,
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: "#D3D3D3",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "#333",
                        '&.Mui-focused': {
                          color: "#D3D3D3",
                        },
                      },
                    }} */}
                <FormControl
                  fullWidth
                  margin="normal"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: "#414141",
                      background: "#F0F0F0",
                      borderRadius: 8,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#D3D3D3",
                      },
                    },
                  }}
                >
                  <InputLabel
                    sx={{
                      color: "#333",
                      '&.Mui-focused': {
                        color: "#D3D3D3",
                      },
                    }}
                  >
                    Select Voucher
                  </InputLabel>
                  <Select
                    value={selectedVoucher ? selectedVoucher.VoucherID : ""}
                    onChange={(e) => {
                      const voucherId = parseInt(e.target.value, 10);
                      const voucher = eligibleVouchers.find(
                        (v) => v.VoucherID === voucherId
                      );
                      setSelectedVoucher(voucher || null);
                    }}
                    label="Select Voucher"
                    sx={{
                      '& .MuiSelect-outlined': {
                        borderColor: "#000",
                      },
                      '&.Mui-focused .MuiSelect-outlined': {
                        borderColor: "#000",
                      },
                    }}
                  >
                    {handleFilterVouchers().map((voucher) => (
                      <MenuItem
                        key={voucher.VoucherID}
                        value={voucher.VoucherID}
                      >
                        <Typography style={{
                          fontWeight: "bold",
                          fontSize: "1.2em",
                          color: "#000",
                        }}>
                          {`${voucher.VoucherName} - ${voucher.Discount}% Off`}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#fff", color: "#000" }}
                  onClick={handleApplyVoucher}
                  disabled={!selectedVoucher}
                >
                  Apply Voucher
                </Button>
              </div>
            </Box>
            <Box flex={1} ml={4}>
              <Typography
                variant="h3"
                component="h2"
                mb={2}
                style={{
                  fontWeight: "bold",
                  fontSize: "2em",
                  color: "#000",
                }}
              >
                Total Price
              </Typography>
              <hr />
              <br />
              <Typography variant="body1" mb={1} style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                color: "#333",
              }}>
                Initial Price: ${initialTotalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body1" mb={1} style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                color: "#333",
              }}>
                Shipping Fee: ${shippingCost}
              </Typography>
              {discountedPrice !== null && (
                <Typography
                  variant="body1"
                  mb={1}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em",
                    color: "#333",
                  }}
                >
                  Discount: -${discountedPrice}
                </Typography>
              )}
              <hr />
              <Typography
                variant="body1"
                mb={1}
                style={{
                  fontSize: "2em",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Total: ${totalPrice}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
      <ErrorDialog
        open={errorDialogOpen}
        onClose={handleCloseErrorModal}
        errorMessage={error}
      />
    </>
  );
};

export default OrderForm;