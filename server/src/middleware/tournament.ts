import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
  generateResultsSchema,
  tournamentSchema,
} from '../zod/tournamentSchema';
import prisma from '../prisma/prisma';

export const findTournament = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { id: req.params.tournamentId },
    });

    if (!tournament) {
      return res
        .status(400)
        .json({ message: 'No tournament found with this id' });
    }

    res.locals.tournament = tournament;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const validateTournamentData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: 'No data provided in request' });
    }

    tournamentSchema.parse(data);
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(401).json({ errors: e.flatten().fieldErrors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const validateResultsData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const tournamentId = req.params.tournamentId;

    const tournament = await prisma.tournament.findFirst({
      where: { id: tournamentId },
      include: { participants: { select: { userId: true } } },
    });

    if (!tournament) {
      return res
        .status(400)
        .json({ message: 'No tournament found with this id' });
    }

    const schema = generateResultsSchema(
      tournament.participants,
      +tournament.rounds
    );
    schema.parse(data);
    next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(401).json({ errors: e.flatten().fieldErrors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};
