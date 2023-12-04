const { checkUserNotAuth } = require("../../helpers/checkUserAuth");
const wishlistModel =require("../../models/favourt.model");
const productModel = require("../../models/product.model");

module.exports.getWishlist = async(req, res, next) => {
 let category_poroducts = await productModel.find({ category : product.category._id})
    res.render("website/wishlist.ejs", {
      category_poroducts:category_poroducts,
    });
  };

  //__________________Post Add wishList________________________
module.exports.addWishlist = async (req, res, next) => {
  checkUserNotAuth(req, res); // If not session redirect to login page
  product_id = req.params.id;

  let product_in_wishlist = await wishlistModel.findOne({product_id:product_id , user_id: req.session.user_id});
  if (product_in_wishlist) {
    req.flash("msg_err", "This product already added to your wishlist");
   return res.redirect("/website/home");
   
  }
  let favourtProduct = await wishlistModel.insertMany({product_id:product_id , user_id: req.session.user_id});
  return res.redirect("/website/wishlist");
};

//__________________Get All category ________________________
module.exports.getWishlist = async (req, res, next) => {
  checkUserNotAuth(req, res); // If not session redirect to login page
  
  let favourtProducts = await wishlistModel.find({user_id:req.session.user_id}).populate("product_id")
  res.render("website/wishlist.ejs", {
    favourtProducts: favourtProducts,
  });
};


//__________________ delete category________________________
module.exports.deleteWishlist = async (req, res, next) => {
  checkUserNotAuth(req, res); // If not session redirect to login page
  await wishlistModel.findByIdAndDelete(req.params.id);
  res.redirect("/website/wishlist");
};