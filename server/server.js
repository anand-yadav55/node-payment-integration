const express = require('express');
const app = express();
const shortid = require('shortid');
const razorpay = require('razorpay');
const cors = require('cors');
var bodyParser = require('body-parser');
const { json } = require('body-parser');

require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.urlencoded());
// app.use(express.json());
// app.use(express.static('client/build'));

let razorpayInstance = new razorpay({
  key_id: process.env.razorpay_key_id,
  key_secret: process.env.razorpay_key_secret,
});
app.post('/api', (req, res) => console.log(req.body));
app.post('/razorpay', async (req, res) => {
  const amount = Number(req.body.amount * 100),
    currency = 'INR',
    payment_capture = 1;
  console.log('razorpay post:', req.body);
  const options = {
    amount,
    currency,
    // reciept: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpayInstance.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    json.status(500).send();
  }
});

app.listen(8080, () => console.log('server running @ port 8080'));
