const mongoose = require("mongoose");

const schema = mongoose.Schema({
 quantity : Number,
 user_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'user',
 },
 product_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'products',
 },
 offer_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'offer',
 },

},{timestamps:true});

module.exports = mongoose.model("cart", schema);