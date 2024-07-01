import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import axios from "axios";
import "./index.scss";
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
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Link, useLocation } from "react-router-dom";
import { Result } from "antd";

const OrderForm = () => {
  // const { cartItems } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  // const { cart = [], diamond, totalPrice: initialTotalPrice } = location.state;

  const {
    cart: useCart = {},
    totalPrice: initialTotalPrice = 0,
    diamond = {},
  } = location.state || {};
  const cartItems = useCart.cartItems || [];

  const getProductDetails = (type, id) => {
    return diamond[type]?.find((product) => product.id === id) || {};
  };

  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    deliveryAddress: "",
    shippingMethod: "Express",
    paymentMethod: "Cash on delivery",
    DiamondID: getProductDetails("Diamond", cartItems[0]?.id)?.id || diamond?.id || null,
    StockNumber: cartItems[0]?.stockNumber || diamond?.stockNumber || "",
    DiamondOrigin: cartItems[0]?.diamondOrigin || diamond?.diamondOrigin || "",
    Price: cartItems[0]?.price || diamond?.price || "",
    Clarity: cartItems[0]?.clarity || diamond?.clarity || "",
    Color: cartItems[0]?.color || diamond?.color || "",
    Type: cartItems[0]?.type || diamond?.type || "",
    CaratWeight: cartItems[0]?.caratWeight || diamond?.caratWeight || "",
    Quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    DeliveryAddress: "",
    ProductType: "Diamond",
    TotalPrice: initialTotalPrice,
    VoucherID: "",
    Shipping: "Standard",
    PaymentMethod: "Cash on Delivery",
  });

  const [eligibleVouchers, setEligibleVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSummaryVisible, setOrderSummaryVisible] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [success, setSuccess] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingCost, setShippingCost] = useState(10);

  const [selectedCartItem, setSelectedCartItem] = useState(null);

  //Paypal
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

  const handlePayPalPayment = async (orderId) => {
    await loadPayPalScript();

    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder: () => orderId,
          onApprove: async (data, actions) => {
            try {
              const captureOrderResponse = await axios.post(
                "http://localhost:8090/paypal/capture-paypal-order",
                { orderId }
              );
              console.log(
                "PayPal payment captured successfully:",
                captureOrderResponse.data
              );
              setSuccess(true);
              setOrderSubmitted(true);
              setIsModalOpen(true);
            } catch (error) {
              console.error("Error capturing PayPal order:", error);
              setError("Failed to capture PayPal payment. Please try again.");
            }
          },
          onError: (err) => {
            console.error("PayPal payment error:", err);
            setError("PayPal payment failed. Please try again.");
          },
        })
        .render("#paypal-button-container");
    } else {
      console.error("PayPal SDK not available.");
      setError("PayPal SDK not available. Please try again.");
    }
  };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     // Apply voucher if selected
  //     let finalTotalPrice = totalPrice;
  //     if (selectedVoucher) {
  //       const voucherResponse = await applyVoucher(selectedVoucher.VoucherID);
  //       if (voucherResponse.discountAmount) {
  //         finalTotalPrice -= voucherResponse.discountAmount;
  //       }
  //     }

  //     const orderDetails = {
  //       ...orderData,
  //       cartItems,
  //       totalPrice: finalTotalPrice,
  //       voucherID: selectedVoucher ? selectedVoucher.VoucherID : null,
  //       orderDate: new Date().toISOString().split("T")[0],
  //     };

  //     // Create new order
  //     const response = await axios.post(
  //       "http://localhost:8090/orders/create-order",
  //       orderDetails,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const orderID = response.data.OrderID;

  //     // Update inventory after successful order creation
  //     await axios.put(
  //       "http://localhost:8090/orders/update-inventory",
  //       {
  //         cartItems,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     navigate("/order-success", { state: { orderID: orderID } });
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //     setError("Error creating order. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleInputChange = (name, value) => {
    if (name === "shippingMethod") {
      const cost = value === "Standard" ? 5 : 10;
      setShippingCost(cost);

      const newTotalPrice =
        initialTotalPrice - (discountedPrice ? discountedPrice : 0) + cost;
      setTotalPrice(newTotalPrice.toFixed(2));
    }

    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVoucherChange = (e) => {
    const voucherId = parseInt(e.target.value, 10);
    const voucher = eligibleVouchers.find((v) => v.VoucherID === voucherId);
    setSelectedVoucher(voucher || null);
  };

  // const applyVoucher = async (voucherID) => {
  //   try {
  //     const response = await fetch("http://localhost:8090/orders/apply-voucher", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ voucherID }),
  //     });

  //     if (response.status === 401) {
  //       const refreshResponse = await fetch(
  //         "http://localhost:8090/orders/refresh-token",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             refreshToken: localStorage.getItem("refreshToken"),
  //           }),
  //         }
  //       );

  //       if (refreshResponse.ok) {
  //         const { token } = await refreshResponse.json();
  //         localStorage.setItem("token", token);

  //         return applyVoucher(voucherID);
  //       } else {
  //         throw new Error("Failed to refresh token.");
  //       }
  //     } else if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Failed to apply voucher. Server responded with: ${errorText}`);
  //     }

  //     const data = await response.json();
  //     message.success("Voucher applied successfully!");
  //     return data;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     message.error("Error applying voucher. Please try again.");
  //     throw error;
  //   }
  // };

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

  // const toggleOrderSummary = () => {
  //   setOrderSummaryVisible(!orderSummaryVisible);
  // };

  // const handleApplyVoucherClick = async () => {
  //   if (selectedVoucher) {
  //     try {
  //       await applyVoucher(selectedVoucher.VoucherID);
  //     } catch (error) {
  //       setError("Failed to apply voucher. Please try again.");
  //     }
  //   } else {
  //     message.warning("Please select a voucher to apply.");
  //   }
  // };

  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("User token not found. Please log in again.");
        setLoading(false);
        return;
      }


      // Assuming `DiamondDetails` is fetched and available
      const { diamond } = location.state; // Assuming `diamond` is fetched from `DiamondDetails`

      const orderItems = cart.map((item) => ({
        DiamondID: item.DiamondID, // Assuming `DiamondID` is correctly named in your cart item object
        DiamondName: item.name,
        DiamondColor: item.Color,
        DiamondClarity: item.Clarity,
        DiamondCarat: item.CaratWeight,
        Quantity: item.quantity,
        Price: item.price,
      }));

      const productType = "Diamond"; // Assuming all items are of type "Diamond"
      const quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderPayload = {
        orderData: {
          ...orderData,
          DiamondID: diamond?.DiamondID || cart[0]?.id, // Lấy từ diamond nếu có, nếu không thì lấy từ cart
          ProductType: productType, // Chắc chắn rằng productType được định nghĩa ở đây
          Quantity: quantity, // Chắc chắn rằng quantity được định nghĩa ở đây
          TotalPrice: parseFloat(totalPrice),
          VoucherID: selectedVoucher ? selectedVoucher.VoucherID : null,
          Shipping: orderData.shippingMethod,
          PaymentMethod: orderData.paymentMethod,
          OrderItems: orderItems,
          [`${productType}ID`]: productID,
        },
      };

      const response = await axios.post(
        "http://localhost:8090/orders/create",
        { orderData: orderPayload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (!selectedCartItems) {
        setError("No items selected for order.");
        setLoading(false);
        return;
      }

      const selectedCartItems = cartItems.filter((item) =>
        selectedCartItems.includes(item.id)
      );
      if (!selectedCartItems.length) {
        setError("No valid cart item selected.");
        setLoading(false);
        return;
      }

      // const { id: productID, productType, price, quantity } = selectedCartItems[0];

      if (
        !productType ||
        !["Diamond", "DiamondRings", "DiamondTimepieces", "Bridal"].includes(
          productType
        )
      ) {
        setError("Invalid product type specified.");
        setLoading(false);
        return;
      }

      console.log("Order created successfully:", response.data);
      setSuccess(true);
      setOrderSubmitted(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setOrderSubmitted(false);
  };

  const handleCloseErrorModal = () => {
    setError("");
    setOrderSubmitted(false);
  };

  const handleContinueShopping = () => {
    setIsModalOpen(false);
    setOrderSubmitted(false);
    window.location.href = "/diamond-page";
  };


  return (
    <>
      <Box
        className="max-w-screen-md mx-auto p-6 bg-white shadow-md rounded-lg"
        display="grid"
        gridTemplateColumns="1fr 1fr"
        columnGap={20}
        boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
        borderRadius={16}
        margin="120px 20px 20px 30px"
      >
        <Box>
          <Typography
            variant="h4"
            component="h2"
            style={{
              textAlign: "center",
              background: "linear-gradient(to right, #007BFF 0%, #00BFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              textTransform: "uppercase",
              fontSize: "3em",
            }}
          >
            Delivery Information
          </Typography>

          <Box component="form" mt={3} marginLeft={3}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="First Name"
                    value={orderData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: {
                        background: "#f9f9f9",
                        borderRadius: 8,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Last Name"
                    value={orderData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: {
                        background: "#f9f9f9",
                        borderRadius: 8,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Phone Number"
                    value={orderData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: {
                        background: "#f9f9f9",
                        borderRadius: 8,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    label="Delivery Address"
                    value={orderData.deliveryAddress}

                    name={orderData.deliveryAddress}
                    onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                    variant="outlined"
                    InputProps={{
                      style: {
                        background: "#f9f9f9",
                        borderRadius: 8,
                      },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginBottom: "1em",
                      color: "#077BFF",
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
                    onChange={(e) => handleInputChange("shippingMethod", e.target.value)}
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
                          <Typography color="#333">
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
                          <Typography color="#333">
                            Express Shipping($10)
                          </Typography>
                        </>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <Typography variant="subtitle1">Payment Method</Typography>
                  <RadioGroup
                    value={orderData.paymentMethod}
                    onChange={(e) => setOrderData({ ...orderData, paymentMethod: e.target.value })}
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
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={3} mt={3} marginLeft={5} marginTop={7}>
            <Grid item>
              <Button
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
              </Button>
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
                }}
              >
                Confirm Order
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

        {/* DONT DISPLAY DATA */}
        <Box>
          <TableContainer
            component={Paper}
            style={{ maxHeight: 250, maxWidth: 400, overflow: "auto", marginTop: 30 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.ProductName}</TableCell>
                    <TableCell>{item.Quantity}</TableCell>
                    <TableCell>${item.Price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography
            variant="subtitle1"
            component="h4"
            style={{
              textAlign: "center",
              background: "linear-gradient(to right, #007BFF 0%, #00BFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              textTransform: "uppercase",
              fontSize: "2em",
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            Summary
          </Typography>

          <TableContainer component={Paper} mt={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder", fontSize: "20px" }}>
                    Product
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bolder", fontSize: "20px" }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ fontWeight: "bolder", fontSize: "20px" }}
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {cartItems.length > 0 ? (
                  cartItems.map((item) => {
                    const matchingDiamond = diamond && diamond.find((d) => d.DiamondID === item.DiamondID);

                    return (
                      <TableRow key={item.id}>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {item.stockNumber || (matchingDiamond ? matchingDiamond.StockNumber : "")} -
                          {item.caratWeight || (matchingDiamond ? matchingDiamond.CaratWeight : "")} grams -
                          {item.color || (matchingDiamond ? matchingDiamond.Color : "")}
                        </TableCell>
                        <TableCell align="center">
                          <img
                            src={item.image || (matchingDiamond ? matchingDiamond.Image : "")}
                            alt={item.name || (matchingDiamond ? matchingDiamond.DiamondOrigin : "")}
                            style={{ width: 100, height: 100, borderRadius: 8 }}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            fontWeight: "bold",
                            color: "red",
                            fontSize: "25px",
                          }}
                        >
                          {item.price}$
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
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
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "#007BFF",
                  textDecoration: "underline",
                  marginLeft: 20,
                  marginTop: 5,
                  fontSize: "1.1em",
                }}
              >
                Voucher
              </Typography>
              <FormControl fullWidth style={{ marginTop: 10, marginLeft: 5 }}>
                <TextField
                  select
                  label="Select a Voucher"
                  value={selectedVoucher ? selectedVoucher.VoucherID : ''}
                  onChange={handleVoucherChange}
                  variant="outlined"
                  SelectProps={{
                    native: true,
                    style: {
                      background: "#f9f9f9",
                      borderRadius: 8,
                    },
                  }}
                >
                  <option value=""></option>
                  {eligibleVouchers.map((voucher) => (
                    <option key={voucher.VoucherID} value={voucher.VoucherID}>
                      {voucher.VoucherName}
                    </option>
                  ))}
                </TextField>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyVoucher}
                style={{ marginTop: 10, fontSize: "0.85em", padding: "8px 16px", boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.2)" }}
              >
                Apply Voucher
              </Button>

              <Box mt={3} ml={3}>
                <Typography variant="body1" gutterBottom>
                  Initial Total Price: ${initialTotalPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Discounted Price: ${discountedPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Shipping Cost: ${shippingCost}
                </Typography>
                <Typography variant="h6">
                  Total Price: ${totalPrice}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

      </Box>
      <Dialog open={isModalOpen} onClose={handleModalClose}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Your order has been submitted successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinueShopping} color="primary">
            Continue Shopping
          </Button>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderForm;
