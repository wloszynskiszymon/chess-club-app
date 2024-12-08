import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';

export const generateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.user) {
    return res.status(403).send('Unauthorized!');
  }
  const userId = res.locals.user.id;

  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_KEY, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_KEY, {
    expiresIn: '7d',
  });

  // 7 days from now just as in the refersh token!
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const hashedRefreshToken = await bcrypt.hash(refreshToken, 8);

  try {
    await prisma.refreshToken.create({
      data: {
        token: hashedRefreshToken,
        userId,
        expiresAt,
      },
    });
  } catch (e) {
    res.status(400).send('Unexpected error occured, please try again.');
  }

  res.locals.accessToken = accessToken;

  next();
};

export const setCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = res.locals.accessToken;
    if (!token) {
      console.error('Access token not found in res.locals');
      return res.status(400).send('Token not found.');
    }

    res.cookie('accessToken', token, {
      maxAge: 15 * 60 * 1000, // 15 minutes
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

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('No token provided.');

  jwt.verify(
    token,
    process.env.JWT_ACCESS_KEY as string,
    (err: VerifyErrors | null, user: string | JwtPayload | undefined) => {
      if (err) {
        console.error('Access token verification failed:', err.message);
        return res
          .status(403)
          .send(
            err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token'
          );
      }

      res.locals.user = user;
      next();
    }
  );
};
