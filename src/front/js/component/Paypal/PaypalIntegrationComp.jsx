import React, { useState, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";

export default function PaypalIntegration({price, products}) {
 const [show, setShow] = useState(false);
 const [success, setSuccess] = useState(false);
 const [ErrorMessage, setErrorMessage] = useState("");
 const [orderID, setOrderID] = useState(false);
 const { store, actions } = useContext(Context);
 const navigate = useNavigate()




 // creates a paypal order
 const createOrder = (data, actions) => {
   return actions.order
     .create({
       purchase_units: [
         {
           description: "Sunflower",
           amount: {
             currency_code: "USD",
             value: price,
           },
         },
       ],
       // not needed if a shipping address is actually needed
       application_context: {
         shipping_preference: "NO_SHIPPING",
       },
     })
     .then((orderID) => {
       setOrderID(orderID);
       return orderID;
     });
 };
 
 // check Approval
 const onApprove = (data, actions) => {
   return actions.order.capture().then(function (details) {
     const { payer } = details;
     setSuccess(true);
     return navigate("/payment/success")
   });
 };


 //capture likely error
 const onError = (data, actions) => {
   setErrorMessage("An Error occured with your payment ");
   alert(console.ErrorMessage)
 };


 
 return (
    <PayPalScriptProvider
      options={{
        "client-id":"AchUM-ba_zP0mxEHUE0aHNcckHMbp0xSfllnGKPLFDcufiWoTay39v5QTf8adzeE3joT2_Ujqo9n37vn",
      }}
    >
      <div>
        <div className="wrapper">
            
      
            <div className="product-price-btn">
              {products.length>0?<button className="btn btn-primary" type="submit" onClick={() => setShow(true)}>
                Checkout
              </button>:<h3>No products in shopping cart</h3>}
              
            </div>
        </div>
  
        {show ? (
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        ) : null}
      </div>
    </PayPalScriptProvider>
  );
 }