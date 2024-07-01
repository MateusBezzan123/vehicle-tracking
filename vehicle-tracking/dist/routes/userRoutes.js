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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const authenticateToken_1 = require("../middlewares/authenticateToken");
const userValidators_1 = require("../validators/userValidators");
const router = (0, express_1.Router)();
router.post('/register', userValidators_1.registerValidation, userController.register);
router.post('/login', userValidators_1.loginValidation, userController.login);
router.get('/me', authenticateToken_1.authenticateToken, userController.getMe);
router.get('/', authenticateToken_1.authenticateToken, userController.listUsers);
router.get('/:id', authenticateToken_1.authenticateToken, userController.getUser);
router.put('/:id', authenticateToken_1.authenticateToken, userValidators_1.updateUserValidation, userController.updateUser);
router.delete('/:id', authenticateToken_1.authenticateToken, userController.deleteUser);
exports.default = router;
