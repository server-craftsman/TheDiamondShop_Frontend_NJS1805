// services/feedbackService.js (or any suitable location in your project)
const BASE_URL = 'http://localhost:8090'; // Replace with your backend URL

export async function getAllFeedbacks(productType, productID, token) {
  const url = `${BASE_URL}/features/feedback/${productType}/${productID}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include the Authorization header with the token
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch feedbacks');
    }

    const feedbacks = await response.json();
    return feedbacks;
  } catch (error) {
    console.error('Error fetching feedbacks:', error.message);
    throw error;
  }
}
