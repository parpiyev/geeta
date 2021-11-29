"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var category_1 = require("../controllers/category");
var category_2 = require("../validators/category");
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new category_1.CategoryController();
var validator = new category_2.CategoryValidator();
router.route("/all").get((0, auth_1.authMiddleware)('user'), controller.getAll);
router.route("/create").post((0, auth_1.authMiddleware)('user'), validator.create, controller.create);
router
    .route("/:id")
    .get((0, auth_1.authMiddleware)('user'), controller.get)
    .patch((0, auth_1.authMiddleware)('user'), validator.update, controller.update)
    .delete((0, auth_1.authMiddleware)('user'), controller.delete);
exports.default = router;
