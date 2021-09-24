const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios').default;
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

res.send("hello world");
});

app.post('/webhook/order/create', (req, res) => {
  
  res.send('OK');
  let res_data = req.body;
// console.log(res_data);
  let products_data=res_data.line_items.map((item)=>{
    return {
      'id':item.id,
      'title':item.title,
      'quantity':item.quantity,
      'sku':item.sku,
      'price':item.price,
    }
  });
  console.log(products_data);
  let order=[
      {'orderId':res_data.id,
       'email':res_data.email,
       'cancel_reason':res_data.cancel_reason,
       'shippingAddress':res_data.shipping_address.address1+" "+res_data.shipping_address.address2,
       'shippingZip':res_data.shipping_address.zip,
       'shippingCity':res_data.shipping_address.city,
       'shippingState':res_data.shipping_address.province,
       'shippingCountry':res_data.shipping_address.country_code,
       'customerPhone':res_data.shipping_address.phone,
       'paymentType':res_data.processing_method,
       'deliveryType':null,

       'customerName':res_data.shipping_address.name,
       'cancelled_at':res_data.cancelled_at,
       'created_at':res_data.created_at,
       'current_subtotal_price':res_data.current_subtotal_price,
       'current_total_price':res_data.current_total_price,
       'order_number':res_data.order_number,
       'phone':res_data.phone,
       'total_discounts':res_data.total_discounts,
       'order_status_url':res_data.order_status_url,
       'remarks':res_data.note,
       'amount':res_data.total_price,
       'products':JSON.stringify(products_data),
      }];

      console.log(order)
      axios.post('/https://analytica.neem.pro/api/get/shopify-webhook/order', order)
      .then(function (response) {
        console.log(response.body);
      })
      .catch(function (error) {
        console.log(error);
      });
  // console.log("product",products_data);
});



/*
On your server run
node listen-for-shopify-webhooks.js
*/
app.listen(port, () => {
  console.log(`Listening for Shopify webhook event data on port ${port}. Started ${new Date().toString()}`);
})