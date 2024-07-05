import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const Feedback = ({ productType, productID }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await axios.get(
          `http://localhost:8090/features/feedback/${productType}/${productID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setError(error.message); // Store error message for display
      }
    };

    fetchFeedbacks();
  }, [productType, productID]);

  if (error) return <div>Error: {error}</div>;

  if (feedbacks.length === 0) return <div>No feedback available.</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customer Feedback
      </Typography>
      <Grid container spacing={2}>
        {feedbacks.map((feedback) => (
          <Grid item xs={12} key={feedback.FeedbackID}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  {/* <Grid item>
                    <Avatar src={feedback.Image} alt={`${feedback.FirstName} ${feedback.LastName}`} />
                  </Grid> */}
                  <Grid item>
                    <Typography variant="h6">
                      {feedback.FirstName} {feedback.LastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feedback.RoleName}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" mt={2}>
                  {feedback.Content}
                </Typography>
                <Typography variant="body1" mt={2}>
                  {feedback.Rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feedback;
