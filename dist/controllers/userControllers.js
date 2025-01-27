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
exports.login = exports.adminSignup = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidator_1 = require("../validators/userValidator");
const userSchema_1 = require("../schemas/userSchema");
const jwtSecret = process.env.JWT_SECRET || '123secret';
function createToken(data) {
    return jsonwebtoken_1.default.sign(data, jwtSecret);
}
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const parseResponse = userValidator_1.userSchema.safeParse(req.body);
        if (!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid user data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return;
        }
        const existingUser = yield userSchema_1.User.findOne({ email: email });
        if (existingUser) {
            res.status(400).json({ message: 'Email is already registered' });
            return;
        }
        const newUser = yield userSchema_1.User.create({
            username: username,
            email: email,
            password: yield bcrypt_1.default.hash(password, 10),
            phoneNumber: phoneNumber
        });
        const token = createToken({ userId: newUser._id, role: newUser.role });
        res.status(200).json({
            message: 'Signed up successfully',
            token
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to signup user' });
    }
});
exports.signup = signup;
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const parseResponse = userValidator_1.userSchema.safeParse(req.body);
        if (!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid admin data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return;
        }
        const existingAdmin = yield userSchema_1.User.findOne({ email: email });
        if (existingAdmin) {
            res.status(400).json({ message: 'Email is already registered' });
            return;
        }
        const newAdmin = yield userSchema_1.User.create({
            username: username,
            email: email,
            password: yield bcrypt_1.default.hash(password, 10),
            phoneNumber: phoneNumber,
            role: 'ADMIN'
        });
        const token = createToken({ userId: newAdmin._id, role: newAdmin.role });
        res.status(200).json({
            message: 'Admin Signed up successfully',
            token
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to signup admin' });
    }
});
exports.adminSignup = adminSignup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const parseResponse = userValidator_1.userLoginCredentialsSchema.safeParse(req.body);
        if (!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid user data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return;
        }
        const existingUser = yield userSchema_1.User.findOne({ email: email });
        if (!existingUser) {
            res.status(500).json({ message: 'User does not exist' });
            return;
        }
        const matchedPassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (matchedPassword) {
            const token = createToken({ userId: existingUser._id, role: existingUser.role });
            res.status(200).json({ message: 'Logged in', token });
        }
        else {
            res.status(401).json({ message: 'Wrong password' });
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to login user' });
    }
});
exports.login = login;
