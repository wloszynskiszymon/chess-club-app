import { Tournament, User } from '@prisma/client';
import express, { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import moment from 'moment';

export const createTournament = async (req: Request, res: Response) => {
  try {
    // Create a new tournament
    const user = res.locals.user as User;
    const data = req.body;

    // Is user a club owner (and coordinator)
    if (user.role !== 'COORDINATOR') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const time = moment(data.time, 'HH:mm').toISOString();

    await prisma.tournament.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time,
        rounds: +data.rounds,
        club: {
          connect: {
            id: user.clubId as string,
          },
        },
        coordinator: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.status(201).json({ message: 'Tournament created' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
