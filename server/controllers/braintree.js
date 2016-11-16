var util = require('util');
var express = require('express');
var braintree = require('braintree');
var bodyParser = require('body-parser');


var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   '7myvbb4xz8xqhgyh',
  publicKey:    'tnqj66vjyjjnxn9q',
  privateKey:   'e1ba9d7f28bfa50453af501ab4df88fa'
});


exports.clientToken = function (request, response) {
  gateway.clientToken.generate({}, function (err, res) {
    if (err) throw err;
    response.json({
      "client_token": res.clientToken
    });
  });
};

exports.transaction = function (request, response) {
  var transaction = request.body;
  gateway.transaction.sale({
    amount: transaction.amount,
    paymentMethodNonce: transaction.payment_method_nonce
  }, function (err, result) {
    if (err) throw err;
    console.log(util.inspect(result));
    response.json(result);
  });
}

