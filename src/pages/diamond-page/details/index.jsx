import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/diamonds/${id}`)
      .then((response) => setDiamond(response.data))
      .catch((error) => console.error("Error fetching diamond:", error));
  }, [id]);

  if (!diamond) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const itemToAdd = {
        id: diamond.DiamondID,
        name: diamond.DiamondOrigin,
        image: diamond.Image,
        price: diamond.Price,
        quantity: 1,
        type: "Diamond",
    };

    addToCart(itemToAdd);
  };

  const handleBuyNow = () => {
    // Replace this with the correct path to your order form
    window.location.href = "/order-form";
  };

  const handleViewCertificate = () => {
    setOpenCertificate(true);
  };

  const handleCloseCertificate = () => {
    setOpenCertificate(false);
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
            />
          </Card>
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
