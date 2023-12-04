const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref : 'user',
    },
    product_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'products',
    }
  },{ timestamps: true });

module.exports = mongoose.model("favourt", schema);
