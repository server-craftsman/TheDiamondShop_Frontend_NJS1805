import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Select,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Fade,
  Divider,
  Avatar,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { AuthContext } from "../../../AuthContext";
import { getAllFeedbacks } from "../../feedback-service/getAllFeedbacks";

import { useCart } from "../../../CartContext";
import Footer from "../../../components/footer";
import Warning from "../../../Warning";
import { Modal } from "antd";

function BridalDetail() {
  const { id } = useParams();
  const { addToCart, cartItems, setCartItems } = useCart();
  const [bridal, setBridal] = useState(null);
  // const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [warningOpen, setWarningOpen] = useState(false);

  // const [materialDetails, setMaterialDetails] = useState([]);
  // const [ringSizeDetails, setRingSizeDetails] = useState([]);

  const [material, setMaterial] = useState("");
  const [ringSize, setSelectedSize] = useState("");
  const [materialOptions, setMaterialOptions] = useState([]);
  const [ringSizeOptions, setRingSizeOptions] = useState([]);
  const [price, setPrice] = useState('');

  // const [loadingRingSizes, setLoadingRingSizes] = useState(true);

  // const [ringSize, setSelectedSize] = useState("Custom");
  const [startIdx, setStartIdx] = useState(0);
  const itemsPerPage = 6;
  const [value, setValue] = useState(0);
  const [openCertificate, setOpenCertificate] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [feedbackBridal, setFeedbackBridal] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  // useEffect để fetch dữ liệu Bridal và Feedback
  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/bridals/${id}`)
      .then((response) => {
        setBridal({
          ...response.data,
        });
      })
      .catch((error) => console.error("Error fetching bridals", error));

    axios
      .get(`http://localhost:8090/products/bridals/`)
      .then((response) => setSimilarProducts(response.data))
      .catch((error) =>
        console.error("Error fetching similar products:", error)
      );

    async function fetchFeedback() {
      try {
        if (!user || !user.token) {
          console.error("User or token not available");
          return;
        }

        const productType = "Bridal"; // Adjust based on your logic
        const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
        setFeedbackBridal(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    }

    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  useEffect(() => {
    fetchBridalAccessoryDetails();
  }, []);

  const fetchBridalAccessoryDetails = async () => {
    try {
      // Update the URL with the dynamic ID
      const response = await axios.get(`http://localhost:8090/products/bridal-accessory/${id}`);
      const accessoryDetails = response.data;

      // Extract unique materials and sizes with IDs
      const materials = Array.from(new Map(accessoryDetails.map(item => [item.MaterialID, { MaterialID: item.MaterialID, MaterialName: item.MaterialName }])).values());
      const sizes = Array.from(new Map(accessoryDetails.map(item => [item.RingSizeID, { RingSizeID: item.RingSizeID, RingSize: item.RingSize }])).values());

      setMaterialOptions(materials);
      setRingSizeOptions(sizes);

      // Check if default values exist in fetched data
      if (materials.length > 0 && sizes.length > 0) {
        setMaterial(materials[0].MaterialName);
        setSelectedSize(sizes[0].RingSize);
        updatePrice(materials[0].MaterialName, sizes[0].RingSize);
      }
    } catch (error) {
      console.error("Error fetching bridal accessory details:", error);
    }
  };

  useEffect(() => {
    if (material && ringSize) {
      updatePrice(material, ringSize);
    }
  }, [material, ringSize]);

  const updatePrice = async (selectedMaterial, selectedSize) => {
    try {
      const response = await axios.get(`http://localhost:8090/products/bridal-accessory/${id}`);
      const accessoryDetails = response.data;
      const selectedAccessory = accessoryDetails.find(
        item => item.MaterialName === selectedMaterial && item.RingSize === selectedSize
      );
      setPrice(selectedAccessory ? selectedAccessory.Price : '');
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Replace with your API endpoint for submitting feedback
      const response = await axios.post(
        `http://localhost:8090/features/feedback/`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming your API responds with the updated list of feedbacks after submission
      setFeedbackBridal(response.data); // Update feedbacks state with new feedback
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!bridal) return <div>Loading...</div>;

  const handlePrev = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (startIdx + itemsPerPage < similarProducts.length) {
      setStartIdx(startIdx + itemsPerPage);
    }
  };

  const TabPanel = ({ value, index, children }) => {
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && children}
      </div>
    );
  };

  const specifications = Object.entries(bridal).filter(
    ([key]) =>
      ![
        "BridalID",
        "Inventory",
        "ImageBrand",
        "ImageBridal",
        "Description",
        "RingSizeRang",
        "MaterialName",
        "RingSizeID",
        "MaterialID",
        "RingSize",
      ].includes(key)
  );

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClickCertificate = () => {
    setOpenCertificate(true);
  };

  const handleCloseCertificate = () => {
    setOpenCertificate(false);
  };

  // const handleQuantityChange = (event) => {
  //   setQuantity(event.target.value);
  // };

  // const handleMaterialChange = (event) => {
  //   setMaterial(event.target.value);
  // };


  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(
      (item) => item.id === bridal.BridalID && item.type === "Bridal"
    );

    if (!alreadyInCart) {
      // Find selected material and its ID
      const selectedMaterialOption = materialOptions.find(
        (option) => option.MaterialName === material
      );
      const materialID = selectedMaterialOption ? selectedMaterialOption.MaterialID : null;

      // Find selected ring size and its ID
      const selectedRingSizeOption = ringSizeOptions.find(
        (option) => option.RingSize === ringSize
      );
      const ringSizeID = selectedRingSizeOption ? selectedRingSizeOption.RingSizeID : null;

      // Create item to add to cart
      const itemToAdd = {
        id: bridal.BridalID,
        name: bridal.NameBridal,
        image: bridal.ImageBridal,
        price: price,
        quantity: 1,
        type: "Bridal",
        materialID: materialID,
        ringSizeID: ringSizeID,
        material: material,
        ringSize: ringSize,
        category: bridal.Category
      };

      // Add item to cart
      addToCart(itemToAdd);
      setOpenModal(true);
    } else {
      setWarningOpen(true);
    }
  };


  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart-page"); // Ensure the correct path
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCombinedWithJewelry = () => {
    navigate("/diamond-page");
  };

  // const handleMenuClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    handleMenuClose();
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const feedbackCount = feedbackBridal.length;

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tùy chọn 'smooth' sẽ cuộn một cách mượt mà
    });
  }



  return (
    <>
      {/* <Modal
        open={openModal}
        // title="Title"
        onCancel={handleCancel}
        style={{
          top: 300,
        }}
        footer={[
          <button className="bt" key="back" onClick={handleCancel}>
            OK
          </button>,
        ]}
      >
        <p className="p">ADD TO CART SUCCESSFULLY</p>
      </Modal> */}
      <Container
        fullWidth
        maxWidth="100%"
        style={{ backgroundColor: "#F3F2F2" }}
      >
        <Grid container spacing={2} marginTop="100px">
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                component="img"
                alt="bridal"
                height="100%"
                image={bridal.ImageBridal}
                className="bridal-image"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  cursor: "zoom-in",
                  marginLeft: "20px",
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Box mt={2}>
                  <Typography
                    variant="h5"
                    component="h2"
                    fontSize={"2.5rem"}
                    fontWeight={"bolder"}
                  >
                    {bridal.NameBridal.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    $
                    {Number(price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                  </Typography>

                  <div>


                    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} margin="normal">
                      <InputLabel id="material-label">Material</InputLabel>
                      <Select
                        labelId="material-label"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                      >
                        {materialOptions.map((materialOption) => (
                          <MenuItem
                            key={materialOption.MaterialID}
                            value={materialOption.MaterialName}
                          >
                            {materialOption.MaterialName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} margin="normal">
                      <InputLabel id="ring-size-label">Ring Size</InputLabel>
                      <Select
                        labelId="ring-size-label"
                        value={ringSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        {ringSizeOptions.map((ringSizeOption) => (
                          <MenuItem
                            key={ringSizeOption.RingSizeID}
                            value={ringSizeOption.RingSize}
                          >
                            {ringSizeOption.RingSize}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>






                    <div style={{ display: "flex" }}>
                      {/* <Box mt={3}>
                      <Button
                        variant="outlined"
                        onClick={handleMenuClick}
                        fullWidth
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "bolder",
                          backgroundColor: "#000000",
                          fontSize: "1.3rem",
                        }}
                      >
                        Select Bridal Size
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        style={{ marginRight: "410px" }}
                      >
                        <Grid
                          container
                          spacing={0}
                          marginTop={0.2}
                          style={{ padding: "5px", marginRight: "50px" }}
                        >
                          {ringSizeDetails.map((size) => (
                            <Grid item key={size} xs={3} sm={3}>
                              <Button
                                variant={
                                  ringSizeDetails === size ? "contained" : "outlined"
                                }
                                onClick={() => handleSizeSelect(size)}
                                fullWidth
                                style={{
                                  color: ringSize === size ? "#fff" : "#000", // White text for contained, black text for outlined
                                  backgroundColor:
                                    ringSize === size ? "#000" : "#fff", // Black background for contained, white background for outlined
                                  border:
                                    ringSize === size
                                      ? "none"
                                      : "1px solid #000", // Black border for outlined
                                  borderRadius: "0px", // Adjust border radius as needed
                                  fontWeight: "bold",
                                }}
                              >
                                {size}
                              </Button>
                            </Grid>
                          ))}
                        </Grid>
                      </Menu>
                      {ringSizeDetails && (
                        <Typography
                          variant="body1"
                          mt={1}
                          fontWeight={"bolder"}
                        >
                          Selected Size: {ringSize}
                        </Typography>
                      )}
                    </Box> */}

                      <Typography variant="h6" marginTop={0.3}>
                        <Link
                          to="/instruct-page"
                          // target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#3AA8FF",
                            fontWeight: "bolder",
                          }}
                        >
                          <IconButton
                            size="small"
                            style={{ marginLeft: "5px", color: "#3AA8FF" }}
                          >
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                          Instructions for choosing Ni(size)
                        </Link>
                      </Typography>
                    </div>

                    {/* <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                  /> */}

                    {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDetailNavigation}
                    style={{ margin: "1rem 0" }}
                  >
                    Apply Change and View Details
                  </Button> */}

                    <Grid container justifyContent="flex-start">
                      <Grid item xs={12} sm={6} md={20}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleCombinedWithJewelry}
                          style={{
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            fontWeight: "bold",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                            fontSize: "1.3rem",
                            padding: "10px 40px 10px 30px",
                            margin: "10px 50px 10px 0",
                            borderRadius: "0.5rem",
                          }}
                          startIcon={<AddShoppingCartIcon />}
                        >
                          COMBINED WITH DIAMOND
                        </Button>
                      </Grid>
                    </Grid>

                    <Grid container justifyContent="space-around">
                      <Grid
                        fullWidth
                        width={"100%"}
                        item
                        xs={12}
                        sm={20}
                        display="flex"
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={handleAddToCart}
                          style={{
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            fontWeight: "bold",
                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                            fontSize: "1.3rem",
                            padding: "10px 40px 10px 30px",
                            margin: "10px 50px 10px 0px",
                            borderRadius: "0.5rem",
                          }}
                          startIcon={<AddShoppingCartIcon />}
                        >
                          Add to Cart
                        </Button>

                        <Link to="/cart-page" style={{ width: "100%" }}>
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={handleBuyNow}
                            style={{
                              backgroundColor: "#000000",
                              color: "#ffffff",
                              fontWeight: "bold",
                              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                              fontSize: "1.3rem",
                              padding: "10px 40px 10px 30px",
                              margin: "10px 50px 10px 0",
                              borderRadius: "0.5rem",
                            }}
                            startIcon={<PaymentIcon />}
                          >
                            Buy Now
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>

                    <Container style={{ marginTop: "10px", marginLeft: "-25px" }}>
                      <Link
                        to="/priceDiamond-page"
                        // target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          component="span"
                          style={{ marginRight: "10px" }}
                        >
                          <img
                            src="https://www.habibjewels.com/image/habibjewels/image/cache/data/all_product_images/product-9430/HOF-01-420x420.jpg"
                            alt="Diamond Icon"
                            style={{ width: 50, height: 50, borderRadius: "50%" }} // Adjust dimensions and styling as needed
                          />
                        </IconButton>
                        <Typography
                          variant="h6"
                          color={"#3AA8FF"}
                          fontWeight={"bolder"}
                          gutterBottom
                        >
                          View the cheapest natural diamond price list in 2024
                        </Typography>
                        <OpenInNewIcon
                          fontSize="1px"
                          style={{ marginLeft: "5px", color: "#3AA8FF" }}
                        />{" "}
                      </Link>
                    </Container>

                  </div>

                </Box>
              </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  borderBottom: "2px solid #ccc",
                }}
              >
                {"Missing Information"}
              </DialogTitle>
              <DialogContent style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="body1" style={{ fontSize: "1.2rem" }}>
                  Please fill out all required fields (Material, Ring Size Rang,
                  Quantity).
                </Typography>
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: "center",
                  borderTop: "2px solid #ccc",
                }}
              >
                <Button
                  onClick={handleClose}
                  color="primary"
                  variant="contained"
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    fontWeight: "bold",
                    borderRadius: "4rem",
                    padding: "10px 40px",
                    margin: "20px 10px",
                  }}
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <br /> <hr />
        <Box>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider", marginTop: "20px" }}
          >
            <div style={{ backgroundColor: "#ECECEC" }}>
              <Tabs
                value={value}
                onChange={handleChangeTabs}
                aria-label="diamond detail tabs"
                sx={{
                  marginLeft: "40%", // Adjust margin left
                  fontSize: "1.5rem", // Adjust font size
                  fontWeight: "bold", // Adjust font weight
                  padding: "20px", // Adjust padding
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#FFFFFF", // Color of the indicator
                    height: "4px", // Height of the indicator
                  },
                  "& .MuiTab-root": {
                    minWidth: 0, // Allows tabs to shrink in size if needed
                    padding: "10px 20px", // Adjust tab padding
                    marginRight: "20px", // Adjust space between tabs
                    color: "#000000", // Default tab text color
                    "&.Mui-selected": {
                      color: "#fff", // Selected tab text color
                      backgroundColor: "#000000", // Selected tab background color
                    },
                    "&:hover": {
                      color: "#666", // Hovered tab text color
                      textDecoration: "#FFFFFF", // Custom underline for hovered tab
                    },
                  },
                }}
              >
                <Tab label="Product Description" />
                {/* <Tab label="Feedback" /> */}
                <Tab label={`Feedback [${feedbackCount} reviews]`} />
              </Tabs>
            </div>
          </Box>
          <TransitionGroup>
            {value === 0 && (
              <CSSTransition
                key="detailed-specifications"
                timeout={300}
                classNames="fade"
              >
                <TabPanel value={value} index={0}>
                  <Box mt={4}>
                    <h1>PRODUCT BRAND SPECIFICATIONS</h1>
                    <TableContainer
                      component={Paper}
                      style={{ backgroundColor: "#f9f9f9", fontSize: "100px" }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <strong>Specification</strong>
                            </TableCell>
                            <TableCell>
                              <strong>Detail</strong>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {specifications.map(([key, value], index) => (
                            <TableRow
                              key={key}
                              style={{
                                backgroundColor:
                                  index % 2 ? "#ffffff" : "#f1f1f1",
                              }}
                            >
                              <TableCell>{key}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <br />
                    <h1>PRODUCT INFORMATION</h1> <br />
                    <p style={{ fontSize: "25px" }}>
                      {bridal.Description}
                    </p>{" "}
                    <br />
                    <p style={{ fontSize: "25px" }}>
                      GIA certificate sample at Diamond Shop:
                    </p>
                    <Button
                      style={{
                        cursor: "pointer",
                        border: "none",
                        padding: 0,
                        background: "none",
                      }}
                      onClick={handleClickCertificate}
                    >
                      <img
                        src="https://24cara.vn/wp-content/uploads/2018/03/4-2.jpg"
                        alt="Zoomable Image"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          cursor: "zoom-in",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </Button>
                    <Dialog
                      open={openCertificate}
                      onClose={handleCloseCertificate}
                      maxWidth="md"
                    >
                      <DialogContent>
                        <Zoom
                          in={openCertificate}
                          style={{
                            transitionDelay: openCertificate ? "100ms" : "0ms",
                          }}
                        >
                          <img
                            src="https://24cara.vn/wp-content/uploads/2018/03/4-2.jpg"
                            alt="Zoomed Image"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Zoom>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseCertificate}
                          color="primary"
                          style={{
                            backgroundColor: "#000000",
                            color: "#ffffff",
                            fontWeight: "bold",
                            borderRadius: "4rem",
                            padding: "10px 40px",
                            margin: "20px 10px",
                          }}
                        >
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Fade in={true} timeout={500}>
                      <Container
                        maxWidth="lg"
                        style={{
                          marginTop: "50px",
                          marginBottom: "50px",
                          maxWidth: "100%",
                        }}
                        fullWidth
                      >
                        <Typography
                          variant="h4"
                          align="center"
                          style={{ marginBottom: "20px", fontWeight: "bolder" }}
                        >
                          SIMILAR PRODUCTS
                        </Typography>
                        <Grid container spacing={3} justifyContent="center">
                          {similarProducts
                            .slice(startIdx, startIdx + itemsPerPage)
                            .map((similarBridals) => (
                              <Grid
                                item
                                key={similarBridals.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={2}
                              >
                                <Link
                                  to={`/bridal-detail/${similarBridals.BridalID}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Card
                                    onClick={handleScroll}
                                    style={{
                                      width: "100%",
                                      height: "520px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={similarBridals.ImageBridal}
                                      alt={similarBridals.ImageBridal}
                                      style={{
                                        width: "100%",
                                        height: "50%",
                                        objectFit: "contain",
                                        cursor: "zoom-in",
                                        transition:
                                          "transform 0.3s ease-in-out",
                                      }}
                                      onMouseEnter={(e) =>
                                      (e.currentTarget.style.transform =
                                        "scale(1.2)")
                                      }
                                      onMouseLeave={(e) =>
                                      (e.currentTarget.style.transform =
                                        "scale(1)")
                                      }
                                    />
                                    <CardContent
                                      style={{
                                        padding: "16px",
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-evenly",
                                      }}
                                    >
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        fontWeight={"bolder"}
                                        fontSize={"1rem"}
                                      >
                                        {similarBridals.NameBridal}
                                      </Typography>
                                      {/* <Typography
                                        variant="subtitle1"
                                        component="h2"
                                      >
                                        Material: {similarBridals.Material}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        fontWeight={"bolder"}
                                      >
                                        Size: {similarBridals.RingSizeRang}
                                      </Typography> */}
                                      <Typography
                                        variant="body2"
                                        // color="textSecondary"
                                        component="p"
                                        fontWeight={"bolder"}
                                        fontSize={"1.5rem"}
                                        style={{
                                          color: "#FFFFFF",
                                          backgroundColor: "#000000",
                                          padding: "8px 16px",
                                          marginTop: "8px",
                                          borderRadius: "4px",
                                          textAlign: "center",
                                        }}
                                      >
                                        ${similarBridals.Price.toFixed(2)}
                                      </Typography>
                                    </CardContent>
                                  </Card>
                                </Link>
                              </Grid>
                            ))}
                        </Grid>
                        <Grid
                          container
                          justifyContent="center"
                          style={{ marginTop: "20px" }}
                        >
                          <Button
                            onClick={handlePrev}
                            disabled={startIdx === 0}
                          >
                            <NavigateBeforeIcon />
                          </Button>
                          <Button
                            onClick={handleNext}
                            disabled={
                              startIdx + itemsPerPage >= similarProducts.length
                            }
                          >
                            <NavigateNextIcon />
                          </Button>
                        </Grid>
                      </Container>
                    </Fade>
                  </Box>
                </TabPanel>
              </CSSTransition>
            )}
            <CSSTransition key="feedback" timeout={300} classNames="fade">
              <TabPanel value={value} index={1}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "20px",
                  }}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box mt={4}>
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", mb: 2 }}
                        >
                          Existing Feedbacks
                        </Typography>
                        <Grid container spacing={3}>
                          {feedbackBridal.length > 0 ? (
                            feedbackBridal.map((feedback, index) => (
                              <React.Fragment key={feedback.id}>
                                <Grid
                                  item
                                  xs={12}
                                  container
                                  alignItems="center"
                                  sx={{ mb: 2 }}
                                >
                                  {/* Customer Avatar */}
                                  <Grid
                                    item
                                    xs={2}
                                    style={{ marginRight: "-12%" }}
                                  >
                                    <Avatar
                                      alt={feedback.LastName}
                                      src={feedback.Image}
                                    />
                                  </Grid>
                                  {/* Feedback Details */}
                                  <Grid
                                    item
                                    xs={10}
                                    sx={{ paddingLeft: "25px" }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      sx={{
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                        mb: 1,
                                      }}
                                    >
                                      {feedback.FirstName} {feedback.LastName}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        fontStyle: "italic",
                                        color: "text.secondary",
                                        mb: 1,
                                      }}
                                    >
                                      Evaluation Date:{" "}
                                      {new Date(
                                        feedback.EvaluationDate
                                      ).toLocaleDateString()}
                                    </Typography>
                                    <Rating
                                      name={`rating-${feedback.id}`}
                                      value={feedback.Rating}
                                      readOnly
                                      precision={0.5}
                                      emptyIcon={
                                        <StarIcon
                                          style={{ opacity: 0.55 }}
                                          fontSize="inherit"
                                        />
                                      }
                                    />
                                    <Typography sx={{ mt: 1 }}>
                                      {feedback.Content}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                {index < feedbackBridal.length - 1 && (
                                  <Divider
                                    variant="middle"
                                    sx={{
                                      my: 2,
                                      borderColor: "rgba(0, 0, 0, 0.12)",
                                    }}
                                  />
                                )}
                                {index < feedbackBridal.length - 1 && (
                                  <hr
                                    style={{
                                      width: "100%",
                                      borderTop: "1px dashed black",
                                      marginBottom: "16px",
                                    }}
                                  />
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <Typography
                              variant="subtitle1"
                              sx={{ fontStyle: "italic" }}
                            >
                              No feedback available
                            </Typography>
                          )}
                        </Grid>
                      </Box>
                    </Grid>

                    {/* <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          p: 4,
                          backgroundColor: "#000",
                          color: "#fff",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h5" component="h2" gutterBottom>
                          Thêm đánh giá
                        </Typography>
                        <form onSubmit={handleFeedbackSubmit}>
                          <FormControl
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 2 }}
                          >
                            <Typography
                              component="legend"
                              style={{
                                fontSize: "1.2rem",
                                marginBottom: "8px",
                              }}
                            >
                              Đánh giá của bạn *
                            </Typography>
                            <Rating
                              name="rating"
                              value={rating}
                              onChange={(event, newValue) => {
                                setRating(newValue);
                              }}
                              precision={1}
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize="inherit"
                                />
                              }
                            />
                          </FormControl>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
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
                    </Grid> */}
                  </Grid>
                </div>
              </TabPanel>
            </CSSTransition>
          </TransitionGroup>
        </Box>
      </Container>
      <Footer />

      <Warning open={warningOpen} onClose={() => setWarningOpen(false)} />
    </>
  );
}

export default BridalDetail;
