const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userName: {
      // type : String,
       type: mongoose.SchemaTypes.ObjectId,
       ref: "user",
    },
    price: Number,
    payment: String,
    address: String,
    status: String,
    required_date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", schema);
