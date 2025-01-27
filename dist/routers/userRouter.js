"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = require("express-rate-limit");
const userControllers_1 = require("../controllers/userControllers");
exports.userRouter = express_1.default.Router();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
exports.userRouter.use(limiter);
exports.userRouter.post('/signup', userControllers_1.signup); // OPEN ROUTES FOR SIGNUP/LOGIN
exports.userRouter.post('/admin-signup', userControllers_1.adminSignup);
exports.userRouter.post('/login', userControllers_1.login);
