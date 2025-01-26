import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const jwtSecret = process.env.JWT_SECRET || '123secret';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        if(!token) {
            res.status(400).json({ message: 'Token required'});
            return 
        }
        const response = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!response.userId) {
            res.status(403).json({ message: 'Unauthorised access'});
            return 
        } else {
            (req as any).userId = response.userId;
            next();
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to authenticate user'});
    }
}

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    try {
        if(!token) {
            res.status(400).json({ message: 'Auth Token required'});
            return
        }
        const response = jwt.verify(token, jwtSecret) as JwtPayload;
        if(!response.userId || response.role !== 'ADMIN') {
            res.status(403).json({ message: 'Unauthorised access'});
            return
        } else {
            (req as any).userId = response.userId;
            next();
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Unable to authenticate admin'});
    }
}