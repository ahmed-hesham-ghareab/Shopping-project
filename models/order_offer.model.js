const mongoose = require("mongoose");

const schema = mongoose.Schema({
    quantity: Number,
    price: Number,
    order_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "order",
    },
    offer_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "offer",
    },
  },{ timestamps: true });

module.exports = mongoose.model("order_offer", schema);
