const express = require("express");
const placeOrder = require("../services/order");
const router = express.Router();

router.post('/place-order', async (req, res, next) => {
    try{
        const data = {
            customerName: req.body.customerName,
            deliveryChannel: 'email',
            referenceNo: 'UNIQUE-REF-01',
            emailAddress: req.body.email,
            lineItems: {
                cardItemId: req.body.cardItemId,
                value: 1
            }
        };
        const response = await placeOrder(req, data);
        res.send(response);
    }catch(e){
        next(e);
    }
});

module.exports = router;