import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userService from '../services/userService';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser(name, email, password);
    res.json(user);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findUserByEmail(req.params.id);
    res.json(users);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUserById(Number(req.params.id));
    res.json(user);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await userService.updateUser(Number(id), { name, email, password });
    res.json(user);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(Number(id));
    res.json({ message: 'User deleted' });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const getMe = async (req: any, res: any) => {
  try {
    const user = req.user;
    if (user && user.userId) {
      const userInfo = await userService.findUserById(user.userId);
      res.json(userInfo);
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};
