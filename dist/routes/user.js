"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var user_1 = require("../controllers/user");
var user_2 = require("../validators/user");
var router = (0, express_1.Router)({ mergeParams: true });
var controller = new user_1.UserController();
var validator = new user_2.UserValidator();
router.route("/all").get((0, auth_1.authMiddleware)('user'), controller.getAll);
router.route("/create").post(validator.create, controller.create);
router.route("/login").post(validator.login, controller.login);
router
    .route("/:id")
    .get((0, auth_1.authMiddleware)('user'), controller.get)
    .patch((0, auth_1.authMiddleware)('user'), validator.update, controller.update)
    .delete((0, auth_1.authMiddleware)('user'), controller.delete);
exports.default = router;
