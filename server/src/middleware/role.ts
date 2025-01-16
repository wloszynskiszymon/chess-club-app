import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export const coordinatorOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user as User;

  if (!user) {
    console.warn('Validate coordinator role after authnetication!');
  }

  if (user.role !== 'COORDINATOR') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
