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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAdmin = exports.getAdminProfile = exports.loginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../lib/prisma"));
// Generate JWT Token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};
// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check for user
        const user = yield prisma_1.default.user.findUnique({
            where: { username },
        });
        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Check if password matches
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.loginAdmin = loginAdmin;
// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
const getAdminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: req.user.id },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
        });
    }
    catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAdminProfile = getAdminProfile;
// @desc    Create initial admin user
// @route   POST /api/admin/setup
// @access  Public
const setupAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check if admin already exists
        const existingAdmin = yield prisma_1.default.user.findFirst({
            where: { isAdmin: true },
        });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin user already exists' });
        }
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create admin user
        const user = yield prisma_1.default.user.create({
            data: {
                username,
                password: hashedPassword,
                isAdmin: true,
            },
        });
        res.status(201).json({
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: generateToken(user.id),
        });
    }
    catch (error) {
        console.error('Setup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.setupAdmin = setupAdmin;
