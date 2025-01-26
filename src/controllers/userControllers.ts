import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userLoginCredentialsSchema, userSchema } from '../validators/userValidator';
import { User } from '../schemas/userSchema';
import { Request, Response } from 'express';

const jwtSecret = process.env.JWT_SECRET || '123secret';

function createToken(data : any) {
    return jwt.sign(data, jwtSecret);
}

export const signup = async (req : Request, res: Response) => { // USER SIGNUP
    const { username, email, password, phoneNumber } = req.body;
    try {
        const parseResponse = userSchema.safeParse(req.body);
        if(!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid user data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return
        }

        const existingUser = await User.findOne({ email: email });
        if(existingUser) {
            res.status(400).json({ message: 'Email is already registered' });
            return
        }

        const newUser = await User.create({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            phoneNumber: phoneNumber
        });

        const token = createToken({ userId: newUser._id, role: newUser.role })

        res.status(200).json({
            message: 'Signed up successfully',
            token
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to signup user'});
    }
}

export const adminSignup = async (req: Request, res: Response) => { // ADMIN SIGNUP
    const { username, email, password, phoneNumber } = req.body;
    try {
        const parseResponse = userSchema.safeParse(req.body);
        if(!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid admin data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return
        }

        const existingAdmin = await User.findOne({ email: email });
        if(existingAdmin) {
            res.status(400).json({ message: 'Email is already registered' });
            return
        }

        const newAdmin = await User.create({
            username: username,
            email: email,
            password: await bcrypt.hash(password, 10),
            phoneNumber: phoneNumber,
            role: 'ADMIN'
        });

        const token = createToken({ userId: newAdmin._id, role: newAdmin.role })

        res.status(200).json({
            message: 'Admin Signed up successfully',
            token
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to signup admin'});
    }
}

export const login = async (req: Request, res: Response) => { // LOGIN
    const { email, password } = req.body;
    try {
        const parseResponse = userLoginCredentialsSchema.safeParse(req.body);
        if(!parseResponse.success) {
            res.status(400).json({
                message: 'Invalid user data',
                issues: parseResponse.error.issues.map((i) => i.message)
            });
            return
        }

        const existingUser = await User.findOne({ email: email });
        if(!existingUser) {
            res.status(500).json({ message: 'User does not exist'});
            return
        }

        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if(matchedPassword) {
            const token = createToken({ userId: existingUser._id, role: existingUser.role})
            res.status(200).json({ message: 'Logged in', token });
        } else {
            res.status(401).json({ message: 'Wrong password'});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Unable to login user' });
    }
}