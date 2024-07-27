import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function MessagePage() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        backgroundColor: '#f7f7f7', // Light background for a refined look
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          backgroundColor: '#ffffff', // Clean white background
          padding: 4,
          borderRadius: 3,
          boxShadow: 4,
          border: '1px solid #e0e0e0', // Subtle border for sophistication
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: '#333333', // Dark color for high contrast and elegance
            marginBottom: 2,
          }}
        >
          Account Confirmation Email Sent
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#555555', // Softer text color
            marginBottom: 3,
          }}
        >
          Please check your email and follow the instructions to complete the registration.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          sx={{
            marginTop: 2,
            paddingX: 4,
            paddingY: 1.5,
            fontSize: '16px',
            borderRadius: 25,
            backgroundColor: '#333', // Luxurious color
            '&:hover': {
              backgroundColor: '#000', // Darker shade on hover
            },
          }}
        >
          Return to Login
        </Button>
      </Box>
    </Container>
  );
}

export default MessagePage;
