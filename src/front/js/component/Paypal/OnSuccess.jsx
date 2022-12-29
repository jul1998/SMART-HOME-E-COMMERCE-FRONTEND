import React from 'react';
import "../../../styles/paypal.css"


const PaymentSuccessPage = () => {
  return (
    <div className='paypal--success'>
       <div className="paypal--card">
      <div>
        <i className="checkmark">✓</i>
      </div>
        <h1 className='paypal--h1'>Success</h1> 
        <p className='paypal--p' >We received your purchase request;<br/> we'll be in touch shortly!</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
