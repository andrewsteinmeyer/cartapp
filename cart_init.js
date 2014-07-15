var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/cart');
require('./models/cart_model.js');
var Address = mongoose.model('Address');
var Billing = mongoose.model('Billing');
var Product = mongoose.model('Product');
var ProductQuantity = mongoose.model('ProductQuantity');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');

function addProduct(customer, order, name, imagefile, price, description, instock) {
  var product = new Product({name:name,
                              imagefile:imagefile,
                              price:price,
                              description:description,
                              instock:instock});

  product.save(function(err, results) {
    order.items.push(new ProductQuantity({quantity: 1, product: [product]}));
    order.save();
    customer.save();
    console.log("Product " + name + " Saved.");
  });
}

Product.remove().exec(function(){
  Order.remove().exec(function() {
    Customer.remove().exec(function() {
      var shipping = new Address({
        name: 'Penny',
        address: '12 Brewster Court',
        city: 'Charleston',
        state: 'SC',
        zip: '29464'
      });
      var billing = new Billing({
        cardtype: 'Visa',
        name: 'Penny',
        number: '1234567890',
        expiremonth: 1,
        expireyear: 2020,
        address: shipping
      });
      var customer = new Customer({
        userid: 'Penny',
        shipping: shipping,
        billing: billing,
        cart: []
      });
      customer.save(function(err, result) {
        var order = new Order({
          userid: customer.userid,
          items: [],
          shipping: customer.shipping,
          billing: customer.billing
        });
        order.save(function(err, result) {
          addProduct(customer, order, 'Fluffy Girl Print', 'Penny1.JPG', 100.56,
                      'Cutest little girl orange flufferton', Math.floor((Math.random()*10)+1));
        });
        order.save(function(err, result) {
          addProduct(customer, order, 'Cute Pumpkin', 'Penny2.JPG', 125.15,
                      'Orange fluffy baby girl', Math.floor((Math.random()*10)+1));
        });
      });
    });
  });
});