var express = require('express');

const app = express();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json({
  limit: '50mb'
}));

require('dotenv').config();
var port = process.env.PORT || 8070;
app.listen(port);

console.log("Listening on Port : ", port);

var products = require('./routes/products');
var cart = require('./routes/cart');


// returns the list of products A,B,C,D

app.get('/ecommerce/products', products.getProducts);


// add items to the basket/cart

app.post('/ecommerce/cart/items', cart.addItemstoCart);


 /**
  * returns list items from the basket/cart(with individual price and 
  * discount data),the total price and total discounts applied
  */

app.get('/ecommerce/cart', cart.getCartItems);



module.exports = app;
