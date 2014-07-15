var mongoose = require('mongoose'),
  Customer = mongoose.model('Customer'),
  Address = mongoose.model('Address'),
  Billing = mongoose.model('Billing');

exports.getCustomer = function(req, res) {
  Customer,findOne({userid: 'Penny'})
  .exec(function(err, customer) {
    if (!customer) {
      res.json(404, {msg: 'Customer Not Found.'});
    } else {
      res.json(customer);
    }
  });
};

exports.updateShipping = function(req, res) {
  var newShipping = new Address(req.body.updatedShipping);
  Customer.update({ userid: 'Penny'}, {$set: {shipping: [newShipping.toObject()]}})
  .exec(function(err, results) {
    if (err || results < 1) {
      res.json(404, {msg: 'Failed to update Shipping'});
    } else {
      res.json({msg: "Customer Shipping Updated"});
    }
  });
};

exports.updateBilling = function(req, res) {
  //This is where you could verify credit card info
  //and halt the checkout if invalid
  var newBilling = new Billing(req.body.updatedBilling);
  Customer(update({ userid: 'Penny'}), {$set: {billing: [newBilling.toObject()]}})
  .exec(function(err, results) {
    if (err || results < 1) {
      res.json({msg: 'Failed to Update Billing'});
    } else {
      res.json({msg: "Customer Billing Updated"});
    }
  });
};

exports.updateCart = function(req, res) {
  Customer.update({ userid: 'Penny'}, {$set: {cart: req.body.updatedCart}})
  .exec(function(err, results) {
    if (err || results < 1) {
      res.json(404, {msg: 'Failed to update Cart'});
    } else {
      res.json({msg: 'Customer Cart Updated'});
    }
  });
};