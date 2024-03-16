"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'User Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
    },
    role: {
        type: String,
        default: 'user',
    },
});
exports.User = (0, mongoose_1.model)('User ', exports.userSchema);
