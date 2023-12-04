const mongoose = require("mongoose");

const schema = mongoose.Schema({
 title: String,

},{timestamps:true});

module.exports = mongoose.model("stock_type", schema);