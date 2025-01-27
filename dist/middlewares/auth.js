"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET || '123secret';
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(400).json({ message: 'Token required' });
            return;
        }
        const response = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!response.userId) {
            res.status(403).json({ message: 'Unauthorised access' });
            return;
        }
        else {
            req.userId = response.userId;
            next();
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to authenticate user' });
    }
};
exports.authenticateUser = authenticateUser;
const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            res.status(400).json({ message: 'Auth Token required' });
            return;
        }
        const response = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!response.userId || response.role !== 'ADMIN') {
            res.status(403).json({ message: 'Unauthorised access' });
            return;
        }
        else {
            req.userId = response.userId;
            next();
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to authenticate admin' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
