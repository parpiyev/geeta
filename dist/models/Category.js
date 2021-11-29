"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uuid_1 = require("uuid");
var categorySchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: uuid_1.v4
    },
    name: {
        type: String,
        required: true
    },
});
exports.default = mongoose_1.default.model("Category", categorySchema);
