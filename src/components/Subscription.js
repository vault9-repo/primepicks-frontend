import React from 'react';
import api from '../api';

const plans = [
  { name: 'daily', price: 50 },
  { name: 'weekly', price: 300 },
  { name: 'monthly', price: 600 },
  { name: 'jackpot', price: 1000 }
];

const Subscription = () => {

  const handlePayment = (plan, price) => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_aa6debf75dbee2c9c5ec4aaaf61f0996ba13e17e',
      email: prompt("Enter your email for payment"),
      amount: price * 100,
      callback: function(response){
        api.post('/verify-payment', { reference: response.reference, plan })
          .then(res => alert(res.data.message))
          .catch(err => alert(err.response?.data?.message || 'Payment verification failed'));
      },
      onClose: function(){
        alert('Payment cancelled');
      }
    });
    handler.openIframe();
  };

  return (
    <div>
      <h3>Subscribe to access predictions</h3>
      {plans.map(p => (
        <button key={p.name} onClick={() => handlePayment(p.name, p.price)}>
          {p.name} - KES {p.price}
        </button>
      ))}
    </div>
  );
};

export default Subscription;
