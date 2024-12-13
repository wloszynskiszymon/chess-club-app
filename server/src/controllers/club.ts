import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { clubSchema } from '../zod/clubSchema';
import prisma from '../prisma/prisma';
import { generateZodIssue } from './errors';
import { ZodError } from 'zod';

export const createClub = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as User;

    if (user.role !== 'COORDINATOR') {
      return res
        .status(403)
        .json({ message: 'Only coordinators can create a club.' });
    }

    const club = clubSchema.parse(req.body);

    const existingClub = await prisma.club.findUnique({
      where: { name: club.name },
    });

    if (existingClub) {
      return res.status(400).json({
        errors: generateZodIssue(['name'], 'This club name is already taken'),
      });
    }

    // Create a new club and update the user's clubId - both succeed or both fail
    const { newClub } = await prisma.$transaction(async tx => {
      const newClub = await tx.club.create({
        data: {
          name: club.name,
          owner: {
            connect: { id: user.id },
          },
        },
      });

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { clubId: newClub.id },
      });

      return { newClub, updatedUser };
    });

    return res.status(201).json(newClub);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.flatten() });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
