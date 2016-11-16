var MainController = require('./../controllers/core.js');

var CheckoutController = require('./../controllers/checkout.js');

var SuggestionController = require('./../controllers/suggestion.js');

var BraintreeController = require('./../controllers/braintree.js');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json({ type: 'application/*+json' });

module.exports = function(app) {

    app.get('/', MainController.index);

    app.post('/paypal-notify', jsonParser, MainController.paypalNotify);

    app.get('/getBasicInfo/:vin', CheckoutController.getBasicInfo);

    app.post('/suggestion', SuggestionController.getSuggestion);

    app.post('/api/v1/token', BraintreeController.clientToken);

    app.post('/api/v1/process', jsonParser, BraintreeController.transaction);

}
