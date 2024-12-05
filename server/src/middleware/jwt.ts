import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  jwt.sign('accessToken', process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

  next();
};

// const issueAccessToken = (res: Response, payload: any) => {
//   const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
//     expiresIn: '15m',
//   });
//   res.cookie('accessToken', accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'Strict',
//     maxAge: 15 * 60 * 1000, // 15 minutes
//   });
//   return accessToken;
// };
