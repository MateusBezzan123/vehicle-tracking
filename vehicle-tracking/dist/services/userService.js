"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.findUserById = exports.findUserByEmail = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const createUser = async (name, email, password) => {
    // Verifica se o email já existe no banco de dados
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    return prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return prisma.user.findUnique({ where: { id } });
};
exports.findUserById = findUserById;
const updateUser = async (id, data) => {
    if (data.password) {
        data.password = await bcryptjs_1.default.hash(data.password, 10);
    }
    return prisma.user.update({
        where: { id },
        data
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
