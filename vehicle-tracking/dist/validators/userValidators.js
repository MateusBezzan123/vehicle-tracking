"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required')
];
exports.updateUserValidation = [
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Email is invalid'),
    (0, express_validator_1.body)('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
