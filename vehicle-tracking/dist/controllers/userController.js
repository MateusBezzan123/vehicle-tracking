"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.deleteUser = exports.updateUser = exports.getUser = exports.listUsers = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userService = __importStar(require("../services/userService"));
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';
const register = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const user = await userService.createUser(name, email, password);
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.login = login;
const listUsers = async (req, res) => {
    try {
        const users = await userService.findUserByEmail(req.params.id);
        res.json(users);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.listUsers = listUsers;
const getUser = async (req, res) => {
    try {
        const user = await userService.findUserById(Number(req.params.id));
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const user = await userService.updateUser(Number(id), { name, email, password });
        res.json(user);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(Number(id));
        res.json({ message: 'User deleted' });
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.deleteUser = deleteUser;
const getMe = async (req, res) => {
    try {
        const user = req.user;
        if (user && user.userId) {
            const userInfo = await userService.findUserById(user.userId);
            res.json(userInfo);
        }
        else {
            res.status(400).json({ error: 'User not found' });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
};
exports.getMe = getMe;
