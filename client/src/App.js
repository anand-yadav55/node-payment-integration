import './styles.css';
function App() {
  let order = [
    {
      qty: 2,
      name: 'Margarita A',
      variant: 'crab & cucumber',
      price: '412.00',
    },
    {
      qty: 1,
      name: 'Margarita B',
      variant: 'tuna & cucumber',
      price: '112.00',
    },
    {
      qty: 3,
      name: 'Margarita C',
      variant:
        'smoked salman over rice with extra sauce to check if this line works',
      price: '1236.00',
    },
  ];
  let subtotal = 0,
    discount = 759.5,
    deliveryFee = 12.0,
    taxes = 46.15;

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
                <div className="orderItem">
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
            <span>₹ {subtotal - discount + deliveryFee + taxes}</span>
          </div>
        </div>
      </div>
      <div className="placeOrder">
        <button>PLACE ORDER</button>
      </div>
    </div>
  );
}

export default App;
