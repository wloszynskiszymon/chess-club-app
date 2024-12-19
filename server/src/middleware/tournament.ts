import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { tournamentSchema } from '../zod/tournamentSchema';

export const validateTournamentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    tournamentSchema.parse(data);
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(401).json({ errors: e.flatten().fieldErrors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
