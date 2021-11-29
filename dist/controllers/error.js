"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
var config_1 = __importDefault(require("../config/config"));
var ErrorController = /** @class */ (function () {
    function ErrorController() {
        var _this = this;
        this.sendErrorDev = function (err, req, res, next) {
            return res.status(err.statusCode).json({
                success: false,
                error: err,
                message: err.message,
                stack: err.stack
            });
        };
        this.sendErrorProd = function (err, req, res, next) {
            // A) Operational, trusted error: send message to client
            if (err.isOperational) {
                return res.status(err.statusCode).json({
                    success: false,
                    message: err.message
                });
            }
            // B) Programming or other unknown error: don't leak error details
            console.error("ERROR 💥", err);
            res.status(500).json({
                success: false,
                message: "Something went very wrong!"
            });
        };
        this.hanle = function (err, req, res, next) {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || "error";
            if (config_1.default.NodeEnv === "development") {
                _this.sendErrorDev(err, req, res, next);
            }
            else if (config_1.default.NodeEnv === "production") {
                _this.sendErrorProd(err, req, res, next);
            }
        };
    }
    return ErrorController;
}());
exports.ErrorController = ErrorController;
