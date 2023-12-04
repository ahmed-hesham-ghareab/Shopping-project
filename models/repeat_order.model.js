const mongoose = require("mongoose");

const schema = mongoose.Schema({
 type : String,
 day : String,
 order_id : {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'order',
 }
},{timestamps:true});

module.exports = mongoose.model("repeat_order", schema);