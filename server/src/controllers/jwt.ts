import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

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

export const refreshAccessToken = (req: Request, res: Response) => {
  // Extract refreshToken from cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ error: 'No refresh token found' });
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

      return res.status(200).json({ token: newAccessToken });
    }
  );
};
