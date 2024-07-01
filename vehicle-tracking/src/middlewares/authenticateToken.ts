import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err:any, user:any) => {
    if (err) return res.sendStatus(403);
    if (typeof user === 'object') {
      req.user = user as JwtPayload & { userId: number };
    }
    next();
  });
};
