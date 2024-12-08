import { Request, Response, Router } from 'express';
import {
  prepareRegistrationData,
  validateLoginCredentials,
  validateRegisterUser,
} from '../middleware/auth';

import prisma from '../prisma/prisma';
import { generateToken, setCookie } from '../middleware/jwt';

export const authRouter = Router();

// Route to register a new user
authRouter.post(
  '/register',
  validateRegisterUser,
  prepareRegistrationData,
  async (req: Request, res: Response) => {
    try {
      const user = req.body;

      await prisma.user.create({
        data: user,
      });
      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error! Something unexpected happened.',
      });
    }
  }
);

authRouter.post(
  '/login',
  validateLoginCredentials,
  generateToken,
  setCookie,
  async (req: Request, res: Response) => {
    try {
      return res.status(201).json({ message: 'User logged in successfully!' });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error! Something unexpected happened.',
      });
    }
  }
);
