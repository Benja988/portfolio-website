import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../lib/mongodb';
import User from '../models/User';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    await connectToDatabase();
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'Y839uewie832e', {
      expiresIn: '30d',
    });

    res.json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};