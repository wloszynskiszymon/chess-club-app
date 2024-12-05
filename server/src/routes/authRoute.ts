import { Request, Response, Router } from 'express';
import {
  prepareRegistrationData,
  validateRegisterUser,
} from '../middleware/auth';
import prisma from '../prisma/prisma';

export const authRouter = Router();

// Route to register a new user
authRouter.post(
  '/register',
  validateRegisterUser,
  prepareRegistrationData,
  async (req: Request, res: Response) => {
    try {
      const user = req.body;

      const response = await prisma.user.create({
        data: user,
      });

      console.log(response);
      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error! Something unexpected happened.',
      });
    }
  }
);
