import { Request, Response, Router } from 'express';
import {
  prepareRegistrationData,
  validateLoginCredentials,
  validateRegisterUser,
} from '../middleware/auth';

import prisma from '../prisma/prisma';
import {
  authenticate,
  generateToken,
  refreshAccessToken,
  setCookie,
} from '../middleware/jwt';

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
    console.log(res.locals.user);
    if (!res.locals.accessToken) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ token: res.locals.accessToken });
  }
);

authRouter.get(
  '/refresh',
  refreshAccessToken,
  (req: Request, res: Response) => {
    return res.status(200).json({ token: res.locals.accessToken });
  }
);

authRouter.get('/logout', authenticate, (req: Request, res: Response) => {
  if (!req.cookies.refreshToken)
    return res.status(400).json({ message: 'No refresh token found' });
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully!' });
});

authRouter.get('/test', authenticate, (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Authenticated!' });
});
