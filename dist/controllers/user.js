"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserController = void 0;
var main_1 = require("../storage/main");
var appError_1 = __importDefault(require("../utils/appError"));
var catchAsync_1 = __importDefault(require("../utils/catchAsync"));
var auth_1 = require("../middleware/auth");
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserController = /** @class */ (function () {
    function UserController() {
        var _this = this;
        this.getAll = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.find(req.query)];
                    case 1:
                        users = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: {
                                users: users
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.get = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.findOne({ _id: req.params.id })];
                    case 1:
                        user = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: {
                                user: user
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.create = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var salt, hashPassword, user, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(req.body.password, salt)];
                    case 2:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, main_1.storage.user.create(__assign(__assign({}, req.body), { password: hashPassword }))];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, (0, auth_1.signToken)(user._id, 'user')];
                    case 4:
                        token = _a.sent();
                        res.status(201).json({
                            success: true,
                            data: {
                                token: token,
                                user: user
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.login = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, password, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_1.storage.user.find({ email: req.body.email })];
                    case 1:
                        user = (_a.sent())[0];
                        if (!user)
                            return [2 /*return*/, next(new appError_1.default(401, "Email yoki parol no'to'rg'ri iltomos tekshirib qaytadan urinib ko'ring"))];
                        return [4 /*yield*/, bcrypt_1.default.compare(req.body.password, user.password)];
                    case 2:
                        password = _a.sent();
                        if (!password)
                            return [2 /*return*/, next(new appError_1.default(401, "Email yoki parol no'to'rg'ri iltomos tekshirib qaytadan urinib ko'ring"))];
                        return [4 /*yield*/, (0, auth_1.signToken)(user._id, 'user')];
                    case 3:
                        token = _a.sent();
                        res.status(201).json({
                            success: true,
                            data: {
                                token: token,
                                user: user
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.update = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, _id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = res.locals.id, _id = req.params.id;
                        if (_id !== id)
                            return [2 /*return*/, next(new appError_1.default(403, "Siz o'zingizni malumotlaringizni o'zgartira olasiz"))];
                        return [4 /*yield*/, main_1.storage.user.update(_id, req.body)];
                    case 1:
                        user = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: {
                                user: user
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        this.delete = (0, catchAsync_1.default)(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, _id, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = res.locals.id, _id = req.params.id;
                        if (_id !== id)
                            return [2 /*return*/, next(new appError_1.default(403, "Siz o'zingizni hisobingizni o'chira olasiz"))];
                        return [4 /*yield*/, main_1.storage.user.delete({ _id: _id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, main_1.storage.user.find(req.query)];
                    case 2:
                        users = _a.sent();
                        res.status(200).json({
                            success: true,
                            data: users
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return UserController;
}());
exports.UserController = UserController;
