"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.post('/registration', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.logIn);
