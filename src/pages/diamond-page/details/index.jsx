import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCart } from "../../../CartContext";
import Footer from "../../../components/footer"

const DiamondDetail = () => {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);
  const [clarity, setClarity] = useState("");
  const [cut, setCut] = useState("");
  const [certification, setCertification] = useState("");
  const [openCertificate, setOpenCertificate] = useState(false); // State for dialog
  const { addToCart, cartItems, setCartItems } = useCart();
  const [warningOpen, setWarningOpen] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(2);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [openCombinedDialog, setOpenCombinedDialog] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/diamonds/${id}`)
      .then((response) => setDiamond(response.data))
      .catch((error) => console.error("Error fetching diamond:", error));
  }, [id]);

  if (!diamond) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const updatedCartItems = [...cartItems];
    const alreadyInCart = updatedCartItems.find(
      (item) => item.id === diamond.DiamondID
    );

    if (!alreadyInCart) {
      diamond.Type = "Diamond";
      const itemToAdd = {
        id: diamond.DiamondID,
        name: diamond.DiamondOrigin,
        image: diamond.Image,
        price: diamond.Price,
        type: diamond.Type,
        stockNumber: diamond.StockNumber,
        combinedWithJewelry: true,
        combinedWithJewelryId: 1,
        caratWeight: diamond.caratWeight,
        color: diamond.Color,
        clarity: diamond.Clarity,
        cut: diamond.Cut,
        shape: diamond.Shape,
        certification: diamond.Certification,
    };

    updatedCartItems.push(itemToAdd);
    addToCart(itemToAdd);
    setCartItems(updatedCartItems);
  } else {
    setWarningOpen(true);
  }
};

  const handleBuyNow = () => {
    diamond.Type = "Diamond";
    console.log("Navigating to OrderForm with diamond:", diamond);
    navigate("/order-form", {
      state: {
        diamond: { ...diamond }, // Ensure diamond data is spread properly
        selectedOptions: {
          clarity,
          cut,
          certification,
        },
        caratWeight: diamond.CaratWeight,
        DiamondID: diamond.DiamondID,
        selectedVoucher: null,
        shipping: "Standard",
        paymentMethod: "PayPal",
        totalPrice: diamond.Price,
        combinedWithJewelry: true,
        combinedWithJewelryId: 1,
        color: diamond.Color,
        clarity: diamond.Clarity,
        cut: diamond.Cut,
        shape: diamond.Shape,
        image: diamond.Image,
        name: diamond.DiamondOrigin,
        certification: diamond.Certification,
      },
    });
  };

  const handleViewCertificate = () => {
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

  const handleMouseMove = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;
    setOffset({ x, y });
  };

  const handleCombinedWithJewelry = () => {
    setOpenCombinedDialog(true);
  };

  const handleCloseCombinedDialog = () => {
    setOpenCombinedDialog(false);
  };

  return (
    <>
    <Container>
      <Grid container spacing={2} marginTop= "100px">
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              alt="diamond"
              height="100%"
              image={diamond.Image}
              className="diamond-image"
              style={{
                height: "480px",
                width: "450px",
                padding: "100px 50px 40px 50px",
              }}
              onClick={handleClickOpen}
            />
          </Card>
          <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
              <div
                style={{
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  height: "auto",
                }}
              >
                <Zoom in={open}>
                  <img
                    src={diamond.Image}
                    alt="diamond"
                    style={{
                      position: "absolute",
                      top: `${-offset.y}%`,
                      left: `${-offset.x}%`,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                      width: `${100 * zoom}%`,
                      height: `${100 * zoom}%`,
                    }}
                    onMouseMove={handleMouseMove}
                    onWheel={handleMouseWheel}
                  />
                </Zoom>
              </div>
            </Dialog>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box mt={2}>
                <Typography variant="h5" component="h2">
                  {diamond.DiamondOrigin.toUpperCase()}
                </Typography>
                <Typography variant="body1" component="p">
                  $
                  {Number(diamond.Price)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Typography>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="clarity-label">Clarity</InputLabel>
                  <Select
                    labelId="clarity-label"
                    value={clarity}
                    onChange={(e) => setClarity(e.target.value)}
                    label="Clarity"
                  >
                    <MenuItem value="IF">IF</MenuItem>
                    <MenuItem value="VVS1">VVS1</MenuItem>
                    <MenuItem value="VVS2">VVS2</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="cut-label">Cut</InputLabel>
                  <Select
                    labelId="cut-label"
                    value={cut}
                    onChange={(e) => setCut(e.target.value)}
                    label="Cut"
                  >
                    <MenuItem value="Excellent">Excellent</MenuItem>
                    <MenuItem value="Very Good">Very Good</MenuItem>
                    <MenuItem value="Good">Good</MenuItem>
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
                    <MenuItem value="GIA">GIA</MenuItem>
                  </Select>
                </FormControl>

                <Grid container justifyContent="flex-start">
                  <Grid item xs={12} sm={6} md={8}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleViewCertificate}
                      style={{
                        marginBottom: "8px",
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        fontWeight: "bold",
                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      startIcon={<VisibilityIcon />}
                      className="view-certificate-btn"
                    >
                      View Certificate
                      <span className="zoom-lens"></span>
                    </Button>
                  </Grid>
                </Grid>

                <Grid container justifyContent="flex-start">
                  <Grid item xs={12} sm={6} md={8}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleAddToCart}
                      style={{
                        backgroundColor: "#000000",
                        color: "#ffffff",
                        fontWeight: "bold",
                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                        marginBottom: "8px",
                      }}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      COMBINED WITH JEWELRY
                    </Button>
                  </Grid>
                </Grid>

                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      fontWeight: "bold",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                      marginRight: "15px",
                    }}
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleBuyNow}
                    style={{
                      backgroundColor: "#FF0202",
                      color: "#FFFB02",
                      fontWeight: "bold",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                    }}
                    startIcon={<PaymentIcon />}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Diamond Details
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(diamond).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Typography variant="body1">
                <strong>{key}:</strong> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={openCertificate}
        onClose={handleCloseCertificate}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>View Certificate</DialogTitle>
        <DialogContent>
          <img
            src="https://www.rachelboston.co.uk/cdn/shop/files/RB-GIA-report-8_48c37323-9dbf-4875-be1d-6ec304c5e0a4.jpg?crop=center&height=1000&v=1708019881&width=2000"
            alt="Certificate"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCertificate} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    <Footer />
    </>
  );
};

export default DiamondDetail;
