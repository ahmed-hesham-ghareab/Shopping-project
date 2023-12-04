const mongoose = require("mongoose");

const schema = mongoose.Schema({
    area: String,
    price: Number,
    address: String,
    image: String,
    longitude: String,
    latitude: String,
  },{ timestamps: true }
);

module.exports = mongoose.model("scope", schema);
