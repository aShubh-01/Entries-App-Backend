"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EntrySchema = new mongoose_1.default.Schema({
    name: { type: String, require: true }
});
exports.Entry = mongoose_1.default.model('Entry', EntrySchema);
