const { getDashboard } = require('../../controllers/dashboard/DashboardController');
const { getProducts, create, addProduct, updatProducts, updateProduct, deleteProduct } = require('../../controllers/dashboard/ProductsController');


const bodyParser = require("body-parser");
const { getlogin, postlogin, logout } = require('../../controllers/dashboard/AuthController');
const { uploadSingleFile, uploadMixOfFiles } = require('../../helpers/FileUpload');
const { checkAdminAuth } = require('../../helpers/checkAdminAuth');
const { login_validation } = require('../../validations/login.validation');
const { add_product_validation } = require('../../validations/AddProduct.vidation');
const { createCategory, addCategory, getcategorys, updatcategorys, updatecategory, deletecategory } = require('../../controllers/dashboard/CategoryController');
const { add_category_validation } = require('../../validations/AddCategory.validation');
const { createScope, addScope, getScopes, updatScopes, updateScope, deleteScope } = require('../../controllers/dashboard/ScopeController');
const { add_Scope_validation } = require('../../validations/AddScope.vidation');
const { deleteStock_type, updateStock_type, updatStock_types, getStock_types, addStock_type, createStock_type } = require('../../controllers/dashboard/Stock_typeController');
const { getorders, addorder, createorder, updateorder, updatorder, deleteorder } = require('../../controllers/dashboard/OrderController ');
const { add_order_validation } = require('../../validations/AddOrder.vidation');
const { createoffer, addoffer, getoffers, updatoffer, updateoffer, deleteoffer } = require('../../controllers/dashboard/OfferController');
const { add_offer_validation } = require('../../validations/AddOffer.vidation');
const { add_Stock_type_validation } = require('../../validations/AddStock_type.vidation');

const router = require('express').Router();
  let fileds = [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 3 },
    ];

router.get('/' , getDashboard);
router.get('/login' , getlogin);
router.get('/logout' , logout);
router.post('/login',bodyParser.urlencoded({ extended: true }) , login_validation  , postlogin);
//______________product_________________
router.get('/products/create' , create);
router.post('/products/add',uploadMixOfFiles(fileds, "products") , add_product_validation , addProduct);
router.get('/products' , getProducts);
router.get('/products/update/:id' , updatProducts);
router.post('/product/update/:id' ,uploadMixOfFiles(fileds, "products") , updateProduct);
router.get('/product/delete/:id' , deleteProduct);
//_________________category__________________
router.get('/category/create' , createCategory);
router.post('/category/add',uploadSingleFile('image','category') , add_category_validation , addCategory);
router.get('/category' , getcategorys);
router.get('/category/update/:id' , updatcategorys);
router.post('/category/update/:id' ,uploadSingleFile('image','category') , updatecategory);
router.get('/category/delete/:id' , deletecategory);
//_________________Scope__________________
router.get('/Scope/create' , createScope);
router.post('/Scope/add',uploadSingleFile('image','Scope') , add_Scope_validation , addScope);
router.get('/Scope' , getScopes);
router.get('/Scope/update/:id' , updatScopes);
router.post('/Scope/update/:id' ,uploadSingleFile('image','Scope') , updateScope);
router.get('/Scope/delete/:id' , deleteScope);
//_________________Stock_type__________________
router.get('/Stock_type/create' , createStock_type);
router.post('/Stock_type/add', bodyParser.urlencoded({ extended: true }) ,add_Stock_type_validation , addStock_type);
router.get('/Stock_type' , getStock_types);
router.get('/Stock_type/update/:id' , updatStock_types);
router.post('/Stock_type/update/:id', bodyParser.urlencoded({ extended: true }) , updateStock_type);
router.get('/Stock_type/delete/:id' , deleteStock_type);
//_________________orders__________________
router.get('/order/create' , createorder);
router.post('/order/add',bodyParser.urlencoded({ extended: true }) , addorder);
router.get('/order' , getorders);
router.get('/order/update/:id' , updatorder);
router.post('/order/update/:id' ,bodyParser.urlencoded({ extended: true }) , updateorder);
router.get('/order/delete/:id' , deleteorder);
//_________________offers__________________
router.get('/offer/create' , createoffer);
router.post('/offer/add' , uploadSingleFile('image','Offer') , add_offer_validation, addoffer);
router.get('/offer' , getoffers);
router.get('/offer/update/:id' , updatoffer);
router.post('/offer/update/:id', uploadSingleFile('image','Offer')  , updateoffer);
router.get('/offer/delete/:id' , deleteoffer);


module.exports = router;