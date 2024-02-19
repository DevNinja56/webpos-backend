const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    id: { type: String },
    name: { type: String} ,
    usageInstructions: { type: String},
    termsAndConditions: { type: String},
    giftCardInformation: { type: String},
    brand: { type: String},
    currency: { type: String},
    fromValue: { type: Number },
    toValue: { type: Number },
    cardFaceImage: {type: String},
    cardFaceHash: {type: String},
    productId: { type: String},
    discount: { type: String},
    activationFees: { type: Number },
    fulfillmentFees: { type: Number },
    shippingFees: { type: Number },
    refundFees: { type: Number },
    customizationFees: { type: Number },
    otherFees: { type: Number },
    reconciliationCurrency: { type: String},
    exchangeRate: { type: Number },
    categories: { type: [String]},
    countryCode: { type: String}
});

module.exports = mongoose.model("Item", itemSchema);