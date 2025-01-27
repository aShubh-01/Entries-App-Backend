"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const express_rate_limit_1 = require("express-rate-limit");
const entryControllers_1 = require("../controllers/entryControllers");
exports.entryRouter = express_1.default.Router();
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 60,
    standardHeaders: 'draft-8',
    legacyHeaders: false
});
exports.entryRouter.use(limiter);
exports.entryRouter.use(auth_1.authenticateUser); // ROUTES CAN BE ACCESSED BY NORMAL USER & ADMINS
exports.entryRouter.get('/byId/:id', entryControllers_1.getEntry);
exports.entryRouter.get('/all', entryControllers_1.getAll);
exports.entryRouter.use(auth_1.authenticateAdmin); // ROUTES CAN BE ONLY ACCESSED BY ADMINS
exports.entryRouter.post('/create', entryControllers_1.addEntry);
exports.entryRouter.put('/update/:id', entryControllers_1.updateEntry);
exports.entryRouter.delete('/delete/:id', entryControllers_1.deleteEntry);
