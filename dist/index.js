"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = __importDefault(require("./database"));
const userRouter_1 = require("./routers/userRouter");
const entryRouter_1 = require("./routers/entryRouter");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') }); // CONFIGURE ENVIRONMENT
const port = Number(process.env.PORT) || 3000;
const app = (0, express_1.default)(); // CONFIGURE EXPRESS APP
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => { res.send("API Working"); });
app.use('/user', userRouter_1.userRouter);
app.use('/entry', entryRouter_1.entryRouter);
(0, database_1.default)(); // CONNECT WITH DATABASE
app.listen(port, () => console.log(`App running on port ${port}`));
module.exports = app;
