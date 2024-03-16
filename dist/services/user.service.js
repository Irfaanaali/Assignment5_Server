"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../model/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
    const userInstance = new user_model_1.User(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    const result = yield user_model_1.User.create(userInstance);
    return result;
});
const logIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user1 = yield user_model_1.User.findOne({ username: payload.username });
    if (!user1) {
        throw new Error("Invalid credentials");
    }
    const user = {
        _id: user1._id,
        username: user1 === null || user1 === void 0 ? void 0 : user1.username,
        email: user1 === null || user1 === void 0 ? void 0 : user1.email
    };
    const plainTextPassword = payload.password;
    const hashedPassword = user1.password;
    const isCorrectPassword = yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    if (!isCorrectPassword) {
        throw new Error('Invalid credentials');
    }
    const jwtPayload = {
        _id: user1._id,
        username: user1.username,
        email: user1.email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, 'irfanali', {
        expiresIn: '1d',
    });
    return {
        user,
        token,
    };
});
exports.UserService = {
    createUser,
    logIn
};
