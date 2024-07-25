import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
  IconButton,
  Fade,
  Divider,
  Avatar,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useCart } from "../../../CartContext";
import Warning from "../../../Warning";
import "./index.scss";
import Footer from "../../../components/footer";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { AuthContext } from "../../../AuthContext";
import { getAllFeedbacks } from "../../feedback-service/getAllFeedbacks";
import { Modal } from "antd";

const DiamondDetail = () => {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [clarity, setClarity] = useState("");
  const [cut, setCut] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [certification, setCertification] = useState("");
  const [openCertificate, setOpenCertificate] = useState(false);
  const { addToCart, cartItems, setCartItems } = useCart();
  const [warningOpen, setWarningOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [collection, setCollection] = useState("DiamondRings");
  const [startIdx, setStartIdx] = useState(0);
  const itemsPerPage = 6;
  const [isZoomed, setIsZoomed] = useState(false);
  const [value, setValue] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [feedbackDiamond, setFeedbackDiamond] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/diamonds/${id}`)
      .then((response) => setDiamond(response.data))
      .catch((error) => console.error("Error fetching diamond:", error));

    // Fetch similar products based on diamond characteristics
    axios
      .get(`http://localhost:8090/products/diamonds/`)
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

        const productType = "Diamond"; // Adjust based on your logic
        const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
        setFeedbackDiamond(feedbacks);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    }

    if (user) {
      fetchFeedback();
    }
  }, [id, user]);

  // Function to handle submitting new feedback
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
      setFeedbackDiamond(response.data); // Update feedbacks state with new feedback
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!diamond) return <div>Loading...</div>;

  // const handleAddToCart = () => {
  //   const updatedCartItems = [...cartItems];
  //   const alreadyInCart = updatedCartItems.find(
  //     (item) => item.id === diamond.DiamondID
  //   );

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(
      (item) => item.id === diamond.DiamondID && item.type === "Diamond"
    );

    if (!alreadyInCart) {
      const itemToAdd = {
        id: diamond.DiamondID,
        name: diamond.DiamondOrigin,
        image: diamond.Image,
        price: diamond.Price,
        type: "Diamond",
        quantity: 1,
        stockNumber: diamond.StockNumber,
        combinedWithJewelry: true,
        combinedWithJewelryId: 1,
        caratWeight: diamond.CaratWeight,
        color: diamond.Color,
        clarity: diamond.Clarity,
        cut: diamond.Cut,
        shape: diamond.Shape,
        certification: diamond.Certification,
      };

      addToCart(itemToAdd);
      setOpenModal(true);
    } else {
      setWarningOpen(true);
    }
  };

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

  const specifications = Object.entries(diamond).filter(
    ([key]) =>
      ![
        "DiamondID",
        "Inventory",
        "ImageBrand",
        "Image",
        "Descriptors",
      ].includes(key)
  );

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart-page"); // Ensure the correct path
  };

  const handleClickCertificate = () => {
    setOpenCertificate(true);
  };

  const handleCloseCertificate = () => {
    setOpenCertificate(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseWheel = (event) => {
    event.preventDefault();
    const scale = event.deltaY > 0 ? 1.1 : 0.9;
    setZoom((prevZoom) => prevZoom * scale);
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    // Prevent default behavior of mouse move to avoid accidental zooming
    e.preventDefault();
  };

  const handleSearch = () => {
    // Close the dialog
    setOpen(false);

    // Determine the base URL based on the selected collection
    let url = "/";
    if (collection === "DiamondRings") {
      url = "/ring-page";
    } else if (collection === "DiamondTimepieces") {
      url = "/timepiece-page";
    } else if (collection === "Bridal") {
      url = "/bridal-page";
    }
    // Navigate to the constructed URL
    navigate(url);
  };

  const handleChange = (event) => {
    setCollection(event.target.value);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const feedbackCount = feedbackDiamond.length;

  const handleScroll = () =>{
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
        className="container"
        style={{ backgroundColor: "#F3F2F2" }}
      >
        <Grid container spacing={2} marginTop="0px" fullWidth>
          <Grid item xs={12} md={5}>
            <Card style={{ height: "590px", overflow: "hidden" }}>
              <Zoom in={true} style={{ transitionDelay: "100ms" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    cursor: "zoom-in",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onWheel={handleMouseWheel}
                >
                  <CardMedia
                    component="img"
                    height="auto"
                    image={diamond.Image}
                    alt={diamond.DiamondOrigin}
                    style={{
                      position: "absolute",
                      top: 50,
                      left: 90,
                      transform: isZoomed ? "scale(1.2)" : "scale(1)",
                      transformOrigin: "center center",
                      width: "70%",
                      height: "auto%",
                      maxWidth: "100%",
                      cursor: "zoom-in",
                      transition: "transform 0.5s ease-in-out",
                    }}
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                  />
                </div>
              </Zoom>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card>
              <CardContent style={{ marginBottom: "-10px", height: "600px" }}>
                <Box mt={2}>
                  <Typography
                    variant="h5"
                    component="h2"
                    fontWeight={"bolder"}
                    fontSize={"2.5rem"}
                  >
                    {"DIAMOND " +
                      diamond.DiamondOrigin.toUpperCase() +
                      " - " +
                      diamond.StockNumber +
                      " - " +
                      "Color: " +
                      diamond.Color}
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
                    {Number(diamond.Price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&.")}
                  </Typography>

                  {/* <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="clarity-label">Clarity</InputLabel>
                    <Select
                      labelId="clarity-label"
                      value={clarity}
                      onChange={(e) => setClarity(e.target.value)}
                      label="Clarity"
                    >
                      <MenuItem value={diamond.Clarity}>
                        {diamond.Clarity}
                      </MenuItem>
                    </Select>
                  </FormControl> */}

                  <br />

                  <strong style={{ fontSize: "20px", fontWeight: "normal" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                      Cut:{" "}
                    </span>
                    {diamond.Cut}
                  </strong>
                  <br />
                  <strong style={{ fontSize: "20px", fontWeight: "normal" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                      Certification:{" "}
                    </span>
                    {diamond.GradingReport}
                  </strong>
                  <br />
                  <br />

                  {/* <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="cut-label">Cut</InputLabel>
                    <Select
                      labelId="cut-label"
                      value={cut}
                      onChange={(e) => setCut(e.target.value)}
                      label="Cut"
                    >
                      <MenuItem value={diamond.Cut}>
                        {diamond.Cut ? `${diamond.Cut}` : "None"}
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="certification-label">
                      Certification
                    </InputLabel>
                    <Select
                      labelId="certification-label"
                      value={certification}
                      onChange={(e) => setCertification(e.target.value)}
                      label="Certification"
                    >
                      <MenuItem value={diamond.GradingReport}>
                        {diamond.GradingReport}
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                  <div style={{ margin: "0 5px" }}>
                    <Grid container justifyContent="flex-start">
                      <Grid item xs={12} sm={6} md={20}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={handleClickOpen}
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
                          COMBINED WITH JEWELRY
                        </Button>
                      </Grid>
                    </Grid>

                    <Dialog open={open} onClose={handleClose}>
                      <DialogContent style={{ padding: "70px" }}>
                        <FormControl fullWidth style={{ padding: "30px" }}>
                          <InputLabel id="collection-label">
                            Collection
                          </InputLabel>
                          <Select
                            labelId="collection-label"
                            value={collection}
                            onChange={handleChange}
                            label="Collection"
                          >
                            <MenuItem value="DiamondRings">
                              Diamond Rings
                            </MenuItem>
                            <MenuItem value="DiamondTimepieces">
                              Diamond Timepieces
                            </MenuItem>
                            <MenuItem value="Bridal">Bridal</MenuItem>
                          </Select>
                        </FormControl>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleSearch}
                          color="primary"
                        >
                          Search
                        </Button>
                      </DialogActions>
                    </Dialog>

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
                  </div>
                </Box>

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
                    <Typography variant="h6" color={"#3AA8FF"} gutterBottom>
                      View the cheapest natural diamond price list in 2024
                    </Typography>
                    <OpenInNewIcon
                      fontSize="1px"
                      style={{ marginLeft: "5px", color: "#3AA8FF" }}
                    />{" "}
                  </Link>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />
        <hr />

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
                      {diamond.Descriptors}
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
                            .map((similarDiamond) => (
                              <Grid
                                item
                                key={similarDiamond.DiamondID}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={2}
                              >
                                <Link
                                  to={`/diamond-detail/${similarDiamond.DiamondID}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Card
                                  onClick = {handleScroll}
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
                                      image={similarDiamond.Image}
                                      alt={similarDiamond.StockNumber}
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
                                      <Typography variant="h6" component="h3">
                                        DIAMOND{" "}
                                        {similarDiamond.DiamondOrigin.toUpperCase()}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        fontWeight={"bolder"}
                                      >
                                        Stock Number:{" "}
                                        {similarDiamond.StockNumber}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        fontWeight={"bolder"}
                                      >
                                        Carat Weight:{" "}
                                        {similarDiamond.CaratWeight}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        fontWeight={"bolder"}
                                        fontSize={"1.5rem"}
                                      >
                                        ${similarDiamond.Price.toFixed(2)}
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
                          {feedbackDiamond.length > 0 ? (
                            feedbackDiamond.map((feedback, index) => (
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
                                {index < feedbackDiamond.length - 1 && (
                                  <Divider
                                    variant="middle"
                                    sx={{
                                      my: 2,
                                      borderColor: "rgba(0, 0, 0, 0.12)",
                                    }}
                                  />
                                )}
                                {index < feedbackDiamond.length - 1 && (
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

                    <Grid item xs={12} md={6}>
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
                    </Grid>
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
};

export default DiamondDetail;
