"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("../middleware/multer"));
var auth_1 = require("../middleware/auth");
var product_1 = require("../controllers/product");
var product_2 = require("../validators/product");
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new product_1.ProductController();
var validator = new product_2.ProductValidator();
router.route("/all").get((0, auth_1.authMiddleware)('user'), controller.getAll);
router.route("/create").post((0, auth_1.authMiddleware)('user'), (0, multer_1.default)(['image/jpeg', 'image/png'], 10).single('image'), validator.create, controller.create);
router
    .route("/:id")
    .get((0, auth_1.authMiddleware)('user'), controller.get)
    .patch((0, auth_1.authMiddleware)('user'), validator.update, controller.update)
    .delete((0, auth_1.authMiddleware)('user'), controller.delete);
exports.default = router;
