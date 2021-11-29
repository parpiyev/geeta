"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var logger_1 = require("./config/logger");
var error_1 = require("./controllers/error");
var app = (0, express_1.default)();
var errorController = new error_1.ErrorController();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, logger_1.expressLogger)());
app.use(index_1.default);
app.get("/status", function (req, res) {
    res.json({
        stauts: "OK"
    });
});
app.use(errorController.hanle);
exports.default = app;
