// Payment.js
import { useEffect, useState } from 'react';
import { useCart } from '../../CartContext';
import "./index.scss";

function Payment() {
  const { cartItems } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: ''
  });

  useEffect(() => {
    // Lấy selectedItems từ localStorage
    const savedSelectedItems = localStorage.getItem('selectedItems');
    if (savedSelectedItems) {
      setSelectedItems(JSON.parse(savedSelectedItems));
    }
  }, []);

  // Lọc ra những sản phẩm được chọn để thanh toán
  const itemsToPay = cartItems.filter((item) => selectedItems.includes(item.id));
  const total = itemsToPay.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='payment'>
      <h1>Payment online</h1>
      <div className='customer-details'>
        <input
          type='text'
          placeholder='Enter your name'
          value={customerDetails.name}
          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Enter your address'
          value={customerDetails.address}
          onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
        />
      </div>
      <div className='invoice'>
        <h2>Payment detail</h2>
        <ul className='checkout'>
          {itemsToPay.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <span>x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className='total'>Total: ${total.toFixed(2)}</p>
      </div>
      <div className='payment-method'>
        <button onClick={() => console.log('Proceed to PayPal')}>Pay with PayPal</button>
      </div>
    </div>
  );
}

export default Payment;
