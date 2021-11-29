"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStorage = void 0;
var User_1 = __importDefault(require("../../models/User"));
var logger_1 = require("../../config/logger");
var appError_1 = __importDefault(require("../../utils/appError"));
var UserStorage = /** @class */ (function () {
    function UserStorage() {
        this.scope = "storage.user";
    }
    UserStorage.prototype.find = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.find(query)];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.logger.error("".concat(this.scope, ".find: finished with error: ").concat(error_1));
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStorage.prototype.findOne = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.findOne(query)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger_1.logger.warn("".concat(this.scope, ".get failed to findOne"));
                            throw new appError_1.default(404, "User is not found");
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _a.sent();
                        logger_1.logger.error("".concat(this.scope, ".findOne: finished with error: ").concat(error_2));
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStorage.prototype.create = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.create(payload)];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_3 = _a.sent();
                        logger_1.logger.error("".concat(this.scope, ".create: finished with error: ").concat(error_3));
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStorage.prototype.update = function (query, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.findOneAndUpdate(query, payload, {
                                new: true
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger_1.logger.warn("".concat(this.scope, ".update failed to findOneAndUpdate"));
                            throw new appError_1.default(404, "User is not found");
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_4 = _a.sent();
                        logger_1.logger.error("".concat(this.scope, ".update: finished with error: ").concat(error_4));
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserStorage.prototype.delete = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.default.findOneAndDelete(query)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            logger_1.logger.warn("".concat(this.scope, ".delete failed to findOneAndDelete"));
                            throw new appError_1.default(404, "User is not found");
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.logger.error("".concat(this.scope, ".delete: finished with error: ").concat(error_5));
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserStorage;
}());
exports.UserStorage = UserStorage;
