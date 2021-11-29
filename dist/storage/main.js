"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var sample_1 = require("./mongo/sample");
var category_1 = require("./mongo/category");
var product_1 = require("./mongo/product");
var user_1 = require("./mongo/user");
exports.storage = {
    sample: new sample_1.SampleStorage(),
    category: new category_1.CategoryStorage(),
    product: new product_1.ProductStorage(),
    user: new user_1.UserStorage()
};
