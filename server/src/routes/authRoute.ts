import { Router } from 'express';
import {
  logout,
  prepareRegistrationData,
  validateLoginCredentials,
  validateRegisterUser,
} from '../middleware/auth';

import { authenticate, generateTokens, setCookie } from '../middleware/jwt';
import { createUser, loginUser } from '../controllers/auth';
import { refreshAccessToken } from '../controllers/jwt';

export const authRouter = Router();

// Route to register a new user
authRouter.post(
  '/register',
  validateRegisterUser,
  prepareRegistrationData,
  createUser
);

// Route to login a user
authRouter.post(
  '/login',
  validateLoginCredentials,
  generateTokens,
  setCookie,
  loginUser
);

// Route to logout a user
authRouter.get('/logout', logout);

// Route to refresh the access token
authRouter.get('/refresh', refreshAccessToken);
