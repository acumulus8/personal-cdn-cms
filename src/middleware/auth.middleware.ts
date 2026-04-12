import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type {AuthenticatedRequest, AuthJwtPayload} from "../types/auth.types";

export function verifyToken(token: string): AuthJwtPayload | undefined {
    try {
        const secret = process.env.JWT_SECRET ?? '';
        return jwt.verify(token, secret) as unknown as AuthJwtPayload;
    } catch {
        return undefined;
    }
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET ?? '';
        const decoded = jwt.verify(token, secret) as unknown as AuthJwtPayload;

        req.user = decoded;
        next();
    } catch (e) {
        res.status(403).json({ message: 'Invalid token. Access denied.' });
        return;
    }
};