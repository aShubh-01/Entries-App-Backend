import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { adminSignup, login, signup } from '../controllers/userControllers';

export const userRouter = express.Router();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
})

userRouter.use(limiter);

userRouter.post('/signup', signup);     // OPEN ROUTES FOR SIGNUP/LOGIN
userRouter.post('/admin-signup', adminSignup);
userRouter.post('/login', login);