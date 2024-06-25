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
} from "@mui/material";
import Footer from "../../../components/footer";

function TimepieceDetail() {
    const { id } = useParams();
    const [timepieces, setTimepieces] = useState(null);
    const [crystaltype, setCrystalType] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8090/products/timepieces/${id}`)
      .then((response) => setTimepieces(response.data))
      .catch((error) => console.error("Error fetching timepieces", error));
  }, [id]);

  if (!timepieces) return <div>Loading...</div>;
  return (
    <>
    <Container>
      <Grid container spacing={2} marginTop="100px">
        <Grid item xs={12} md={5}>
          <Card>
            <CardMedia
              component="img"
              alt="timepieces"
              height="100%"
              image={timepieces.ImageTimepieces}
              className="timepieces-image"
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Box mt={2}>
                <Typography variant="h5" component="h2">
                  {timepieces.NameTimepieces.toUpperCase()}
                </Typography>
                <Typography variant="body1" component="p">
                  $
                  {Number(timepieces.Price)
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Typography>

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="crystaltype-label">Crystal Type</InputLabel>
                  <Select
                    labelId="crystaltype-label"
                    value={crystaltype}
                    onChange={(e) => setCrystalType(e.target.value)}
                    label="CrystalType"
                  >
                    <MenuItem value="Spherical Sapphire Crystal">Spherical Sapphire Crystal</MenuItem>
                    <MenuItem value="Mineral Crystal">
                        Mineral Crystal
                    </MenuItem>
                    <MenuItem value="Sapphire Crystal">Sapphire Crystal</MenuItem>
                    <MenuItem value="Curved Sapphire Crystal">Curved Sapphire Crystal</MenuItem>
                    <MenuItem value="Anti-Reflective Sapphire Crystal">
                    Anti-Reflective Sapphire Crystal
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
          {Object.entries(timepieces).map(([key, value]) => {
            if (key === "ImageBrand" || key === "ImageTimepieces") {
              return null; // Skip rendering ImageBrand and ImageRing here
            }
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
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

export default TimepieceDetail;
