const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
Shopify issues a HTTP POST request.
- https://help.shopify.com/api/tutorials/webhooks#receive-webhook
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));



app.get('/', (req, res) => {
    res.send("hello world");
});
/*
In your Shopify store under..
Settings->Notifications
Click "Create a webhook"
- Choose your event
- Leave the format as JSON
- set the URL with your IP address to your server so it's something like http://123.345.11.22:3800/your-path
Then update the path "your-path" below to match, as well as the port number below.
*/
app.post('/webhook/order/create', (req, res) => {
  // let Shopify know we received the order details ok
  res.send('OK');

  // the body of the data received
  const theData = req.body;
  console.log(theData);
});

const portToListenOn = 80;

/*
On your server run
node listen-for-shopify-webhooks.js
*/
app.listen(portToListenOn, () => {
  console.log(`Listening for Shopify webhook event data on port ${portToListenOn}. Started ${new Date().toString()}`);
})