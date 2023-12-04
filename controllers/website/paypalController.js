const cartModel = require('../../models/cart.model');
var paypalService = require('../../services/paypal.services');


exports.createPayment = async(req , res) => {
    let cart_total_price  =0;
    let cart = await cartModel.find({ user_id: req.session.user_id }).populate("product_id");
    for (let index = 0; index < cart.length; index++) {

        cart[index].quantity *cart[index].product_id.price_after
        cart_total_price += cart[index].quantity *cart[index].product_id.price_after;

    }
    // create payment object 
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        }, 
        "redirect_urls": {
            "return_url": "http://127.0.0.1:4000/success",
            "cancel_url": "http://127.0.0.1:4000/err"
        },
        "transactions": [{
            "amount": {
                "total": cart_total_price,
                "currency": "USD"
            },
            "description": " a book on mean stack "
        }]
    }

    paypalService.createPaypalPayment(payment).then((transaction)=>{
        console.log("Create Payment Response");
        console.log("transaction : " + JSON.stringify(transaction));
        var transactionId = transaction.id; 
        console.log("id : " + transactionId);
        // NEED TO LOG ALL TRANSACTION FOR EACH REQUEST AND RESPONSE FOR AUDITING
        // generate transaction reference number tx_randomnumber
        // transaction status [Success , failed , cancelled , pending]
        res.redirect("/website/succes")
    })
   .catch((err)=>{
        console.log( err ); 
        res.redirect("/err")
        throw err;
   })
}