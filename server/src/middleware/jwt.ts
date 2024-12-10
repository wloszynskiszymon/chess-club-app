import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma';

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_KEY, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_KEY, {
    expiresIn: '7d',
  });
};

export const generateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.status(403).send('Unauthorized');
  }
  const userId = res.locals.user.id;
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  res.locals.accessToken = accessToken;
  res.locals.refreshToken = refreshToken;
  next();
};

export const setCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = res.locals.refreshToken;

    if (!token) {
      return res.status(403).send('Unauthorized');
    }

    res.cookie('refreshToken', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    next();
  } catch (error) {
    console.error('Error setting cookie:', error);
    return res.status(500).send('Internal server error.');
  }
};

// Middleware to authenticate user based on Bearer Token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Unauthorized');

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, userId: any) => {
    if (err) return res.status(401).send('Unauthorized');

    const dbUser = await prisma.user.findUnique({
      where: { id: userId?.id?.id as string },
    });

    if (!dbUser) return res.status(404).send('User not found');

    res.locals.user = dbUser; // Attach user to res.locals
    next();
  });
};

export const refreshAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract refreshToken from cookies
  const refreshToken = req.cookies.refreshToken;

  console.log('REFRESH TOKEN RECIEVED IN REFRESH');

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token found' });
  }

  // Verify the refreshToken
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_KEY,
    async (err: any, userId: any) => {
      if (err) {
        return res
          .status(403)
          .json({ error: 'Invalid or expired refresh token' });
      }

      // Generate a new accessToken
      const newAccessToken = generateAccessToken(userId);

      res.locals.accessToken = newAccessToken;

      next();
    }
  );
};
