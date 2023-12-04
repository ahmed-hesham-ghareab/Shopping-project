const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: String,
    desc: String,
    price: Number,
    image: String,
    offer_stock: Number,
    offer_start: Date,
    offer_end: Date,
    product:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref:"products"
    }], 
  },
  { timestamps: true }
);

// schema.post('find',(doc)=>{
//     doc.offer_start = new Date(doc.offer_start).toLocaleDateString('sv')+"T"+new Date(doc.offer_start).toLocaleTimeString('en-GB')
//   })


module.exports = mongoose.model("offer", schema);
