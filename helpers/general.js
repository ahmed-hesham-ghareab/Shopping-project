const adminModel = require("../models/admin.model");
const categoryModel = require("../models/category.model");
const offerModel = require("../models/offer.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const ScopeModel = require("../models/Scope.model");
const stock_typeModel = require("../models/stock_type.model");

module.exports.getModels = async(req, res) => {
    let categories = await categoryModel.find({}).count();
    let products = await productModel.find({}).count();
    let scope = await ScopeModel.find({}).count();
    let orders = await orderModel.find({}).count();
    let stock_type = await stock_typeModel.find({}).count();
    let offers = await offerModel.find({}).count();
    let admin_name = await adminModel.findOne({})
    console.log(admin_name.name);

    return {
        products: products,
        categories: categories,
        scope: scope,
        orders: orders,
        stock_type: stock_type,
        offers: offers,
        admin_name: admin_name.name
    };
};