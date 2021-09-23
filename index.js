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
  const res = req.body;
  let products=res.line_items.map((item)=>{
    const product={
      'id':item.id,
      'title':item.title,
      'quantity':item.quantity,
      'sku':item.sku,
      'price':item.price,
    }
    return product;
  });
  let order;
  order=[
      {'order_id':res.id,
       'email':res.email,
       'cancel_reason':res.cancel_reason,
       'cancelled_at':res.cancelled_at,
       'created_at':res.created_at,
       'current_subtotal_price':res.current_subtotal_price,
       'current_total_price':res.current_total_price,
       'order_number':res.order_number,
       'phone':res.phone,
       'total_discounts':res.total_discounts,
       'order_status_url':res.order_status_url,
       'note':res.note,
       'total_price':res.total_price,
       'products':products,
      }];
  console.log("order",order);
});



/*
On your server run
node listen-for-shopify-webhooks.js
*/
app.listen(port, () => {
  console.log(`Listening for Shopify webhook event data on port ${port}. Started ${new Date().toString()}`);
})