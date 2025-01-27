"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginCredentialsSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// DATA VALIDATORs FOR USER DATA, THIS WILL MAKE SURE THAT THE USER DATA FOLLOWS A SPECIFIC SCHEMA.
exports.userSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, { message: 'Username cannot be empty' }).max(255, { message: 'Username cannot exceed 255 characters' }),
    email: zod_1.default.string().min(1, { message: 'Email cannot be empty' }).includes('@', { message: `Email missing '@'` }).includes('.com', { message: `Email missing valid domain name , eg. '.com'` }).max(255, { message: 'Email cannot exceed 255 characters' }),
    password: zod_1.default.string().min(8, { message: 'Password must be atleast 8 characters' }).max(255, { message: 'Passworc cannot exceed 255 characters' }),
    phoneNumber: zod_1.default.string().min(10, { message: 'Phone number mus t be 10 digits' }).max(10, { message: 'Phone number cannot be more than 10 digits' }).optional()
});
exports.userLoginCredentialsSchema = zod_1.default.object({
    email: zod_1.default.string().min(1, { message: 'Email cannot be empty' }).includes('@', { message: `Email missing '@'` }).includes('.com', { message: `Email missing valid domain name , eg. '.com'` }).max(255, { message: 'Email cannot exceed 255 characters' }),
    password: zod_1.default.string().min(8, { message: 'Password must be atleast 8 characters' }).max(255, { message: 'Passworc cannot exceed 255 characters' }),
});
