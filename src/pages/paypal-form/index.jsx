import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ orderId }) => {
  const [paymentData, setPaymentData] = useState({
    paymentAmount: '',
    paymentMethod: 'PayPal', // or 'Cash' based on selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8090/orders/paypal-payment/${orderId}`, paymentData);
      alert('Payment processed successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('There was an error processing the payment!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="paymentAmount" value={paymentData.paymentAmount} onChange={handleChange} placeholder="Payment Amount" />
      <select name="paymentMethod" value={paymentData.paymentMethod} onChange={handleChange}>
        <option value="PayPal">PayPal</option>
        <option value="Cash">Cash</option>
      </select>
      <button type="submit">Make Payment</button>
    </form>
  );
};

export default PaymentForm;
