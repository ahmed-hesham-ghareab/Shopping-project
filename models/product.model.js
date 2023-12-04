const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    desc: String,

    price_before: Number,
    price_after: Number,
    quantity: Number,
    stock_type: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "stock_type",
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
    },
    qrcode: String,
    imageCover: String,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", schema);
