"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
exports.default = (function (types, size) {
    return (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        fileFilter: function (req, file, cb) {
            if (!types.includes(file.mimetype)) {
                return cb(null, false);
            }
            cb(null, true);
        },
        limits: {
            fileSize: 1024 * 1024 * size
        }
    });
});
