"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importStar(require("express"));
var sample_1 = __importDefault(require("./sample"));
var category_1 = __importDefault(require("./category"));
var product_1 = __importDefault(require("./product"));
var user_1 = __importDefault(require("./user"));
var router = (0, express_1.Router)({ mergeParams: true });
router.use('/api/file', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
router.use("/sample", sample_1.default);
router.use("/category", category_1.default);
router.use("/product", product_1.default);
router.use("/user", user_1.default);
exports.default = router;
