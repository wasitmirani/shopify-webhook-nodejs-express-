const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port =process.env.PORT || 3000;

/*
Shopify issues a HTTP POST request.
- https://help.shopify.com/api/tutorials/webhooks#receive-webhook
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));



app.get('/',(req, res) => {

res.send("this is nodejs");
});

app.post('/webhook/order/create', (req, res) => {
  
  res.send('OK');
  const theData = req.body;
  console.log(theData);
});



/*
On your server run
node listen-for-shopify-webhooks.js
*/
app.listen(port, () => {
  console.log(`Listening for Shopify webhook event data on port ${port}. Started ${new Date().toString()}`);
})