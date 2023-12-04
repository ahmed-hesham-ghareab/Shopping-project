const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    desc: String,
    image: String,
},{timestamps:true});
// schema.post('init',(doc)=>{
//   doc.image = ""+doc.image
// })

module.exports = mongoose.model("category", schema);