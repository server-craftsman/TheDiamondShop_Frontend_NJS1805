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
import { useCart } from "../../../CartContext";
import  Footer  from "../../../components/footer";
function BridalDetail() {
    const { id } = useParams();
  const [bridal, setBridal] = useState(null);
  const [clarity, setClarity] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/bridals/${id}`)
      .then((response) => setBridal(response.data))
      .catch((error) => console.error("Error fetching bridals:", error));
  }, [id]);

  if (!bridal) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const itemToAdd = {
        id: bridal.BridalID,
        name: bridal.NameBridal,
        image: bridal.ImageBridal,
        price: bridal.Price,
        quantity: 1,
        type: "Bridal",
    };

    addToCart(itemToAdd);
  };

  const handleBuyNow = () => {
    // Replace this with the correct path to your order form
    window.location.href = "/order-form";
  };
  
  return (
<>
    <Container>
      <Grid container spacing={2} marginTop="100px">
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              alt="bridal"
              height="100%"
              image={bridal.ImageBridal}
              className="bridal-image"
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box mt={2}>
                <Typography variant="h5" component="h2">
                  {bridal.BridalStyle.toUpperCase()}
                </Typography>
                <Typography variant="body1" component="p">
                  $
                  {Number(bridal.Price)
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

                {/* <Grid container justifyContent="flex-start">
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
                </Grid> */}

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
          Bridal Details
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(bridal).map(([key, value]) => {
                 if (key === "ImageBrand" || key === "ImageBridal") {
                    return null; // Skip rendering ImageBrand and ImageRing here
              }
              return (
                <Grid item xs={12} sm={6} md={6} key={key}>
                  <Typography variant="body1">
                    <strong>{key}:</strong> {value}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Container>
          <Footer />
    </>
  )
}

export default BridalDetail;
