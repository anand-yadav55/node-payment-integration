import './styles.css';
import { order } from './data';

import { useState, useEffect } from 'react';
import axios from 'axios';

function openModal(msg, orderId, amount) {
  const modal = document.createElement('div');
  // modal.appendChild(
  //   msg ? (
  //     <div className="message">
  //       <span className="msg">
  //         Order has been placed succesfully. Confirmation message has been send!
  //       </span>
  //       <div>
  //         <span>Order Id:</span>
  //         <span>{orderId}</span>
  //       </div>
  //       <div>
  //         <span>Total:</span>
  //         <span>₹{amount}</span>
  //       </div>
  //     </div>
  //   ) : (
  //     <div className="message">
  //       <span className="msg">Payment Declined. Try again</span>
  //     </div>
  //   )
  // );
  document.body.appendChild(modal);
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function getPaymentGateway(amount) {
  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    alert('Unable to connect to payment gateway');
  }
  let data = {};
  axios
    .post('/razorpay', {
      amount: Number(amount),
    })
    .then((res) => {
      data = res.data;

      var options = {
        key: process.env.REACT_APP_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Order Payment',
        order_id: data.id,
        handler: function (response) {
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          return openModal(
            response.razorpay_payment_id ? true : false,
            data.id,
            data.amount
          );
        },
      };

      var gatewayObject = new window.Razorpay(options);
      gatewayObject.open();
    })
    .catch((err) => console.log(err));
}

function App() {
  let [discount, setDiscount] = useState(59.5);
  let [deliveryFee, setDeliveryFee] = useState(12.0);
  let [taxes, setTaxes] = useState(46.15);
  let [subtotal, setSubtotal] = useState(0);
  let [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const localSubtotal = order.reduce(
      (acc, curr) => (acc += Number(curr.price)),
      0
    );

    setSubtotal(localSubtotal);
    setTotalAmount(localSubtotal - discount + deliveryFee + taxes);
  }, [discount, deliveryFee, taxes]);
  return (
    <div className="app">
      <div className="container">
        <div className="head">
          <div className="header">TSX PIZZERIAS</div>
          <div className="deliveryMethod">
            <span className="active">DELIVERY</span>
            <span>PICK UP</span>
          </div>
          <div className="additionalDeliveryDetails">
            <span className="getOrderTimeSpan">25 min</span>
            <span className="getOrderCharges">₹20</span>
            <span className="getOrderDiscounts">Discounts</span>
          </div>
          <div className="menuHours">Menu Hours: 10:00 AM to 11:00 PM</div>
        </div>

        <div className="orders">
          <div className="ordersHeader">
            <span className="ordersTitle">Your Order</span>
            <span className="ordersAddItem">Add items +</span>
          </div>

          <div className="orderItems">
            {order.map((item, i) => {
              subtotal += +item.price;
              return (
                <div className="orderItem" key={i}>
                  <span className="orderItemQuantity">{item.qty}</span>
                  <span className="orderItemName">
                    <span className="orderItemTitle">{item.name}</span>
                    <span className="orderItemVariant">{item.variant}</span>
                  </span>
                  <span className="orderItemPrice">₹{item.price}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="summary">
          <span className="summaryTitle">Summary</span>
          <div className="subtotal amountBox">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="discount amountBox">
            <span>Discount</span>
            <span>-₹{discount}</span>
          </div>
          <div className="deliveryFee amountBox">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="taxes amountBox">
            <span>Taxes</span>
            <span>₹{taxes}</span>
          </div>
          <div className="total amountBox">
            <span>Total</span>
            <span>₹ {totalAmount}</span>
          </div>
        </div>
      </div>
      <div className="placeOrder">
        <button
          onClick={(e) => {
            getPaymentGateway(totalAmount);
          }}
        >
          PLACE ORDER
        </button>
      </div>
      <div
        onClick={() => {
          axios.post('/api', { name: 'anand' }).then((res) => console.log(res));
        }}
      >
        adsasadsdsa
      </div>
    </div>
  );
}

export default App;
