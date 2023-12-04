const { getAbout } = require("../../controllers/website/aboutController");
const { getlogin, logout, postlogin, getRegist, postRegist } = require("../../controllers/website/AuthUserController");
const { getBlogSingle } = require("../../controllers/website/Blog-singleController");
const { getBlog } = require("../../controllers/website/BlogController");
const { getCart, addCart, deletecart, updatCart } = require("../../controllers/website/CartController");
const { getCheckout } = require("../../controllers/website/checkoutController");
const { getContact } = require("../../controllers/website/ContactController");
const { getHome } = require("../../controllers/website/HomeController");
const { getProductSingle } = require("../../controllers/website/product-singleController");
const { getShop } = require("../../controllers/website/shopController");
const { getWishlist, addWishlist, deleteWishlist } = require("../../controllers/website/WishlistController");
const bodyParser = require("body-parser");
var paypalCtrl = require("../../controllers/website/paypalController");
const { getSucces } = require("../../controllers/website/succesController");

const router = require('express').Router();

router.get('/regist' , getRegist);
router.post('/register',bodyParser.urlencoded({ extended: true })  , postRegist);
router.get('/login' , getlogin);
router.post('/addlogin',bodyParser.urlencoded({ extended: true })  , postlogin);
router.get('/logout' , logout);
//________________________pages_____________________________
router.get('/home' ,getHome );
router.get('/about' ,getAbout );
router.get('/blog-single' ,getBlogSingle );
router.get('/blog' ,getBlog );
router.get('/cart' ,getCart );
router.get('/checkout' ,getCheckout);
router.get('/contact' ,getContact );
router.get('/product-single/:id' ,getProductSingle );
router.get('/shop' ,getShop );
router.get('/wishlist' ,getWishlist );
router.get('/succes' ,getSucces );

//______________________wishlist____________________
router.get('/wishlist/add/:id',bodyParser.urlencoded({ extended: true })  , addWishlist);
router.get('/wishlist/', getWishlist);
router.get('/wishlist/delete/:id' , deleteWishlist);

//______________________Cart____________________
router.get('/cart/add/:id/:qty',bodyParser.urlencoded({ extended: true })  , addCart);
router.get('/cart/', getCart);
// router.get('/cart/update/:id' , updatCart);
router.get('/cart/delete/:id' , deletecart);



router.get("/pay" , paypalCtrl.createPayment);



module.exports = router;