import { Club, User } from '@prisma/client';
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

// Safe to pass to the client
export const getSafeClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.club.findMany({
      select: {
        id: true,
        name: true,
        members: true,
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            birthdate: true,
          },
        },
      },
    });

    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const joinClub = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as User;
    const clubId = req.params.clubId;

    if (user.clubId) {
      return res.status(400).json({
        message:
          'You are already a member of a club! Leave your current club to join another one.',
      });
    }

    // Check if the club exists
    const club = await prisma.club.findUnique({
      where: { id: clubId },
      select: { id: true },
    });

    if (!club) {
      return res.status(404).json({
        message: 'Club not found! Unable to join this club.',
      });
    }

    // Check if the user is already a member of the club
    const isMember = await prisma.club.findFirst({
      where: {
        id: clubId,
        members: {
          some: { id: user.id },
        },
      },
    });

    if (isMember) {
      return res.status(400).json({ message: 'You are already in this club!' });
    }

    // Add the user to the club
    await prisma.club.update({
      where: { id: clubId },
      data: {
        members: {
          connect: { id: user.id },
        },
      },
    });

    return res.status(200).json({
      message: 'Successfully joined the club.',
    });
  } catch (error) {
    console.error('Error joining club:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
