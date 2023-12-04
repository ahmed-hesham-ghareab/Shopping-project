const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "admin name required"],
      trim: true,
      minlength: [2, "too short admin name"],
    },
    email: {
      type: String,
      required: [true, "admin email required"],
      trim: true,
      unique: [true, "admin email unique"],
    },
    password: {
      type: String,
      required: [true, "admin password required"],
      minlength: [6, "minlength 6 characters"],
    },
  },
  { timestamps: true }
);
schema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
});
module.exports = mongoose.model("admin", schema);
