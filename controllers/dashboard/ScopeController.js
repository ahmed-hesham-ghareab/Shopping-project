const { checkAdminNotAuth } = require("../../helpers/checkAdminAuth");
const { getModels } = require("../../helpers/general");
const ScopeModel = require("../../models/Scope.model");
const validationResult = require("express-validator").validationResult;

//__________________Get Add Scope Page________________________
module.exports.createScope = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page
    res.render("dashboard/Scope/add_Scope.ejs", {
        validationErrors: req.flash("validationErrors"),
        success: req.flash("success")[0],

    });
};

//__________________Post Add Scope________________________
module.exports.addScope = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page
    //ٍStart Validation
    if (!validationResult(req).isEmpty()) {
        req.flash("validationErrors", validationResult(req).errors);
        return res.redirect("/admin/Scope/create");
    }
    //ٍEnd of Validation

    req.body["image"] = req.file?.filename;
    Scope = await ScopeModel.insertMany(req.body);
    req.flash("success", "Scope has been added successfully");
    return res.redirect("/admin/Scope/create");
};
//__________________Get All Scope ________________________
module.exports.getScopes = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page
    let Scope = await ScopeModel.find({});
    res.render("dashboard/Scope/Scopes.ejs", {
      Scope: Scope,
    });
};

//__________________get update Scope________________________
module.exports.updatScopes = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page

    let Scope_id = req.params.id;
    let Scope = await ScopeModel.findById(Scope_id);
    console.log(Scope);
    res.render("dashboard/Scope/update_Scope.ejs", {
        Scope: Scope,
    });
};

//__________________Post update Scope________________________
module.exports.updateScope = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page
    if (req.file) req.body["image"] = req.file.filename;
    Scope = await ScopeModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/admin/Scope");
};
//__________________ delete Scope________________________
module.exports.deleteScope = async(req, res, next) => {
    checkAdminNotAuth(req, res, next); // If not session redirect to login page
    await ScopeModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/Scope");
};