import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import Footer from "../../../components/footer";

const RingDetail = () => {
  const { id } = useParams();
  const [ring, setRings] = useState(null);
  const [material, setMaterial] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/rings/${id}`)
      .then((response) => setRings(response.data))
      .catch((error) => console.error("Error fetching rings", error));
  }, [id]);

  if (!ring) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <Grid container spacing={2} marginTop="100px">
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                component="img"
                alt="ring"
                height="100%"
                image={ring.ImageRings}
                className="ring-image"
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Box mt={2}>
                  <Typography variant="h5" component="h2">
                    {ring.NameRings.toUpperCase()}
                  </Typography>
                  <Typography variant="body1" component="p">
                    $
                    {Number(ring.Price)
                      .toFixed(2)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Typography>

                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="material-label">Material</InputLabel>
                    <Select
                      labelId="material-label"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      label="Material"
                    >
                      <MenuItem value="18k White Gold">18k White Gold</MenuItem>
                      <MenuItem value="18K White & Rose Gold">
                        18K White & Rose Gold
                      </MenuItem>
                      <MenuItem value="18k Rose Gold">18k Rose Gold</MenuItem>
                      <MenuItem value="14K Rose Gold">14K Rose Gold</MenuItem>
                      <MenuItem value="18k Yellow Gold">
                        18k Yellow Gold
                      </MenuItem>
                      <MenuItem value="14K Yellow Gold">
                        14K Yellow Gold
                      </MenuItem>
                      <MenuItem value="Platinum">Platinum</MenuItem>
                      <MenuItem value="14KT Gold">14KT Gold</MenuItem>
                      <MenuItem value="14KT Gold Ladies">
                        14KT Gold Ladies
                      </MenuItem>
                      <MenuItem value="18k Tri-color Gold">
                        18k Tri-color Gold
                      </MenuItem>
                      <MenuItem value="18k Two-tone Gold">
                        18k Two-tone Gold
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Ring Details
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(ring).map(([key, value]) => {
              if (key === "ImageBrand" || key === "ImageRings") {
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
  );
};

export default RingDetail;
