const categoryModel = require("../../models/category.model");

module.exports.getBlog = async(req, res, next) => {
  let category = await categoryModel.find({});
    res.render("website/blog.ejs", {
      category:category,
    });
  };