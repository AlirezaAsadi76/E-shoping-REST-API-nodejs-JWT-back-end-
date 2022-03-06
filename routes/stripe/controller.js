const Controller = require('../controller');
const Cryptjs = require('crypto-js');
const _ = require('lodash');
const stripe = require('stripe')(process.env.STRIP_KEY);


module.exports= new (class extends Controller {
    async payment(req, res) {
        stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        }, (stripeError, stripeRes) => {
            if (stripeError) {
                this.responce({ res, code: 500, data: stripeError, message: "stripe  error" });
            }
            else {
                this.responce({ res, code: 200, data: stripeRes, message: "successfuly" });

            }
        })
    }
})