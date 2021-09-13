let app = require('express')();

let http = require('http').Server(app);
const bodyParser = require('body-parser');



/*
Shopify issues a HTTP POST request.
- https://help.shopify.com/api/tutorials/webhooks#receive-webhook
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));









process.env.PORT=80;
app.get('/', (req, res) => {
   return res.json("socket server connected");
})

app.post('/webhook/order/create', (req, res) => {
    // let Shopify know we received the order details ok
    res.send('OK');
  
    // the body of the data received
    const theData = req.body;
    console.log(theData);
  });
http.listen(process.env.PORT, () => {
    console.log('Server is started at http://localhost:'+process.env.PORT)
})