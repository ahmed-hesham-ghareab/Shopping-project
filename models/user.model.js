const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    password: String,
    image: String,
    is_Active:Number,
    
},{timestamps:true});
schema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password,7);
  });
module.exports = mongoose.model("user", schema);