import StripeCheckout from "react-stripe-checkout";
import {useState,useEffect} from 'react';
import axios from 'axios';
const Pay = () => {
    const [stripeToken,setStripeToken]=useState(null);
    const onToken = (token) => {
        setStripeToken(token);
    }
    useEffect(()=>{
const makeRequest=async ()=>{
    try {
      const res= await axios.post("http:localhost:5000/api/checkout/payment",
      {
        tokenId:stripeToken.id,
        amount:2000,
      });
      console.log(res.data)
    } catch (error) {
        console.error(error);
    }
}; stripeToken && makeRequest       
    },[stripeToken]);
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <StripeCheckout
             name="Asadi Shop" 
             image=""
             billingAddress
             shippingAddress
             description="your total is 20$"
             amount={2000}
             token={onToken}
             stripeKey="pk_test_51KaHEYJkLOoEo9lh6mzcySj5bPwC5mTuCTwYbNHsxRE96ivQKDinxz5TkWmotndWCWOkeiwl0Zi9HBsq53rChCwk00t8HEiRZM"


             >

            <button style={{
                border: "none",
                width: 120,
                borderRadius: 5,
                padding: "20px",
                backgroundColor: "black",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
            }}>
                pay now
            </button>
            </StripeCheckout>
        </div>
    );
};
export default Pay;