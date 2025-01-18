import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../prisma/prisma';
import { generateAccessToken, generateRefreshToken } from '../controllers/jwt';
import { User } from '@prisma/client';
import { getFullUserData, getUserData } from '../controllers/user';

export const generateTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.status(403).send('Unauthorized');
  }
  try {
    const userId = res.locals.user.id;
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);
    res.locals.accessToken = accessToken;
    res.locals.refreshToken = refreshToken;
    next();
  } catch (error) {
    console.error('Error generating token:', error);
    return res.status(500).json({ message: 'Failed to generate token' });
  }
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
      secure: process.env.production === 'true',
      sameSite: process.env.production === 'true' ? 'none' : 'strict', // for render.com
    });

    next();
  } catch (error) {
    console.error('Error setting cookie:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware to authenticate user based on Bearer Token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Unauthorized');
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send('Token expired');
        }
        return res.status(401).send('Unauthorized');
      }

      if (typeof decoded !== 'object' || decoded === null) {
        return res.status(401).send('Invalid token');
      }

      const userId = decoded.id.id;
      if (!userId) return res.status(401).send('Unauthorized');

      const dbUser = await getFullUserData(userId);

      if (!dbUser) return res.status(404).send('User not authenticated');
      res.locals.user = dbUser;
      next();
    });
  } catch (error) {
    console.error('Error in authenticate:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
