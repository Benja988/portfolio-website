import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};