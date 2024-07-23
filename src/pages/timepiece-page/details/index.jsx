import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../AuthContext";
import { getAllFeedbacks } from "../../feedback-service/getAllFeedbacks";
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
  Avatar,
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
  TextField,
  Fade,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Footer from "../../../components/footer";
import { useCart } from "../../../CartContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Warning from "../../../Warning";
import { Modal } from "antd";

function TimepieceDetail() {
  const { id } = useParams();
  const [timepieces, setTimepieces] = useState(null);
  const [crystaltype, setCrystalType] = useState("");
  const [casesize, setCaseSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openCertificate, setOpenCertificate] = useState(false);
  const { addToCart, cartItems, setCartItems } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [startIdx, setStartIdx] = useState(0);
  const itemsPerPage = 6;
  const [isZoomed, setIsZoomed] = useState(false);
  const [value, setValue] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
  const [feedbackTimepieces, setFeedbackTimepieces] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/timepieces/${id}`)
      .then((response) => setTimepieces(response.data))
      .catch((error) => console.error("Error fetching timepieces", error));

    axios
      .get(`http://localhost:8090/products/timepieces/`)
      .then((response) => setSimilarProducts(response.data))
      .catch((error) => console.error("Error fetching timepieces", error));

    async function fetchFeedback() {
      try {
        if (!user || !user.token) {
          console.error("User or token not available");
          return;
        }

        const productType = "DiamondTimepieces"; // Adjust based on your logic
        const feedbacks = await getAllFeedbacks(productType, id, user.token); // Pass token here
        setFeedbackTimepieces(feedbacks);
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
      setFeedbackTimepieces(response.data); // Update feedbacks state with new feedback
      setRating("");
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  if (!timepieces) return <div>Loading...</div>;
  // const handleAddToCart = () => {
  //   const itemToAdd = {
  //     id: timepieces.DiamondTimepiecesID,
  //     name: timepieces.NameTimepieces,
  //     image: timepieces.ImageTimepieces,
  //     price: timepieces.Price,
  //     type: "DiamondTimepieces",
  //     quantity: parseInt(quantity),
  //     caseSize: timepieces.CaseSize,
  //     crystalType: timepieces.CrystalType,
  //     timepiecesStyle: timepieces.TimepiecesStyle,
  //     totalPrice: timepieces.Price * parseInt(quantity),
  //   };

  //   const updatedCartItems = [...cartItems, itemToAdd];
  //   addToCart(itemToAdd);
  //   setCartItems(updatedCartItems);
  // };

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find(
      (item) =>
        item.id === timepieces.DiamondTimepiecesID &&
        item.type === "DiamondTimepieces"
    );

    if (!alreadyInCart) {
      const itemToAdd = {
        id: timepieces.DiamondTimepiecesID,
        name: timepieces.NameTimepieces,
        image: timepieces.ImageTimepieces,
        price: timepieces.Price,
        type: "DiamondTimepieces",
        quantity: 1,
        caseSize: timepieces.CaseSize,
        crystalType: timepieces.CrystalType,
        timepiecesStyle: timepieces.TimepiecesStyle,
        //     totalPrice: timepieces.Price * parseInt(quantity),
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

  const specifications = Object.entries(timepieces).filter(
    ([key]) =>
      ![
        "DiamondTimepiecesID",
        "Inventory",
        "ImageBrand",
        "ImageTimepieces",
        "Description",
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

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const feedbackCount = feedbackTimepieces.length;
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
        <Grid container spacing={2} marginTop="0">
          <Grid item xs={12} md={5}>
            <Card style={{ height: "515px", overflow: "hidden" }}>
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
                    image={timepieces.ImageTimepieces}
                    alt={timepieces.NameTimepieces}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 20,
                      transform: isZoomed ? "scale(1.2)" : "scale(1)",
                      transformOrigin: "center center",
                      width: "90%",
                      height: "auto",
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
              <CardContent>
                <Box mt={2}>
                  <Typography variant="h5" component="h2" fontWeight={"bolder"}>
                    {timepieces.NameTimepieces.toUpperCase() +
                      " - " +
                      timepieces.TimepiecesStyle +
                      " - " +
                      timepieces.DialColor}
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
                    {Number(timepieces.Price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Typography>
                  <br />

                  <strong style={{ fontSize: "20px", fontWeight: "normal" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                      Crystal Type:{" "}
                    </span>
                    {timepieces.CrystalType}
                  </strong>
                  <br />
                  <strong style={{ fontSize: "20px", fontWeight: "normal" }}>
                    <span style={{ fontSize: "25px", fontWeight: "bold" }}>
                      Case Size:{" "}
                    </span>
                    {timepieces.CaseSize}
                  </strong>
                  <br />
                  <br />

                  <Box style={{ width: "100%", margin: "0 5px" }}>
                    <Grid
                      container
                      justifyContent="flex-start"
                      style={{ width: "100%" }}
                    >
                      <Grid item xs={12} sm={6} md={20}>
                        <Link to="/diamond-page">
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
                              margin: "10px 0",
                              borderRadius: "0.5rem",
                            }}
                            startIcon={<AddShoppingCartIcon />}
                          >
                            COMBINED WITH DIAMOND
                          </Button>
                        </Link>
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

                    <Container
                      style={{ marginTop: "10px", marginLeft: "-25px" }}
                    >
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
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                            }} // Adjust dimensions and styling as needed
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
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
                style={{ backgroundColor: "#979797" }}
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
                      {timepieces.Description}
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
                      maxWidth="lg"
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
                            .map((similarTimepieces) => (
                              <Grid
                                item
                                key={similarTimepieces.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={2}
                              >
                                <Link
                                  to={`/timepieces-detail/${similarTimepieces.DiamondTimepiecesID}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  <Card
                                    style={{
                                      width: "100%",
                                      height: "600px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      image={similarTimepieces.ImageTimepieces}
                                      alt={similarTimepieces.ImageTimepieces}
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
                                        fontSize={"1.2rem"}
                                      >
                                        {similarTimepieces.NameTimepieces}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                      >
                                        Crystal Type:{" "}
                                        {similarTimepieces.CrystalType}
                                      </Typography>
                                      <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        fontWeight={"bolder"}
                                      >
                                        Size: {similarTimepieces.CaseSize}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                        fontWeight={"bolder"}
                                        fontSize={"1.5rem"}
                                      >
                                        ${similarTimepieces.Price.toFixed(2)}
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
                          {feedbackTimepieces.length > 0 ? (
                            feedbackTimepieces.map((feedback, index) => (
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
                                {index < feedbackTimepieces.length - 1 && (
                                  <Divider
                                    variant="middle"
                                    sx={{
                                      my: 2,
                                      borderColor: "rgba(0, 0, 0, 0.12)",
                                    }}
                                  />
                                )}
                                {index < feedbackTimepieces.length - 1 && (
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
}

export default TimepieceDetail;
