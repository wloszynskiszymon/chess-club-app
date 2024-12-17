import { Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const createUser = async (req: Request, res: Response) => {
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
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    if (!res.locals.accessToken) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    return res.status(200).json({ token: res.locals.accessToken });
  } catch (error) {
    console.error('Error in loginUser:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
