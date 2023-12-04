const mongoose = require("mongoose");

const schema = mongoose.Schema({
 quantity : Number,
 total_price : Number,
 order_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'order',
 },
 product_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'product',
 }
},{timestamps:true});

module.exports = mongoose.model("order_products", schema);