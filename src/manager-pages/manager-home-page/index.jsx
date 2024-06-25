import React, { useState, useEffect, useContext } from "react";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { AuthContext } from "../../AuthContext"; // Adjust the path as needed
import axios from "axios";

const ManagerPage = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    Birthday: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    Country: '',
    City: '',
    Province: '',
    PostalCode: '',
    RoleName: '',
    Image: '',
  });
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = user?.token;

      if (!token) {
        console.error('Token not found in AuthContext');
        setFetchError('Token not found in AuthContext');
        setLoading(false);
        return;
      }

      console.log('Fetching user profile with token:', token);

      const response = await axios.get('http://localhost:8090/features/view-profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Ensure credentials are sent
      });

      console.log('Fetch response status:', response.status);

      if (response.status === 200) {
        setUserProfile(response.data.user); // Assuming 'user' key in response contains profile data
        setFetchError(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
      setFetchError('Error fetching user profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // or a spinner component
  }

  return (
    <Box sx={{ p: 3 }}>
      {fetchError && <Typography color="error">Error: {fetchError}</Typography>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardMedia
              component="img"
              sx={{ borderRadius: '50%', width: 150, height: 150, margin: 'auto', mt: 2 }}
              image={userProfile.Image ? userProfile.Image : "https://t3.ftcdn.net/jpg/03/58/90/78/360_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"}
              alt="User"
            />
            <CardContent>
              <Typography variant="h5">{`${userProfile.FirstName} ${userProfile.LastName}`}</Typography>
              <Typography variant="body2" color="textSecondary">{userProfile.RoleName}</Typography>
            </CardContent>
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>Edit Profile</Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>First Name:</strong> {userProfile.FirstName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Last Name:</strong> {userProfile.LastName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Gender:</strong> {userProfile.Gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Birthday:</strong> {userProfile.Birthday}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Email:</strong> {userProfile.Email}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Phone Number:</strong> {userProfile.PhoneNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Address:</strong> {userProfile.Address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Country:</strong> {userProfile.Country}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>City:</strong> {userProfile.City}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1"><strong>Province:</strong> {userProfile.Province}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Postal Code:</strong> {userProfile.PostalCode}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1"><strong>Role Name:</strong> {userProfile.RoleName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerPage;
