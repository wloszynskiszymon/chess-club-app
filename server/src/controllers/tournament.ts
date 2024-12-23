import { Tournament, User } from '@prisma/client';
import express, { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import moment from 'moment';

export const createTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const user = res.locals.user as User;
    const data = req.body;

    if (user.role !== 'COORDINATOR') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const time = moment(data.time, 'HH:mm').toISOString();

    const createdTournament = await prisma.$transaction(async prisma => {
      // Create the tournament
      const tournament = await prisma.tournament.create({
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

      // Fetch club members
      const clubMembers = await prisma.user.findMany({
        where: {
          clubId: user.clubId,
          role: 'CHESS_PLAYER',
        },
        select: {
          id: true,
        },
      });

      // Create participants for the tournament
      const participants = clubMembers.map(member => ({
        userId: member.id,
        tournamentId: tournament.id,
      }));

      await prisma.tournamentParticipant.createMany({
        data: participants,
      });

      return tournament;
    });

    return res
      .status(201)
      .json({ message: 'Tournament created', tournament: createdTournament });
  } catch (e) {
    console.log('Error updating tournament:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const user = res.locals.user as User;
    const data = req.body;
    const tournamentId = req.params.tournamentId;

    if (user.role !== 'COORDINATOR') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tournament = await prisma.tournament.findFirst({
      where: { id: tournamentId },
    });

    if (!tournament) {
      return res
        .status(400)
        .json({ message: 'No tournament found with this id' });
    }

    const time = moment(data.time, 'HH:mm').toISOString();

    const updatedTournament = await prisma.tournament.update({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        time,
        rounds: +data.rounds,
      },
      where: { id: tournamentId },
    });

    return res
      .status(200)
      .json({ message: 'Tournament created', tournament: updatedTournament });
  } catch (e) {
    console.log('Error creating tournament:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const user = res.locals.user as User;
    const tournamentId = req.params.tournamentId;

    if (user.role !== 'COORDINATOR') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tournament = await prisma.tournament.findFirst({
      where: { id: tournamentId },
    });

    if (!tournament) {
      return res
        .status(400)
        .json({ message: 'No tournament found with this id' });
    }

    await prisma.tournament.delete({
      where: { id: tournamentId },
    });

    return res.status(200).json({ message: 'Tournament deleted' });
  } catch (e) {
    console.log('Error deleting tournament:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getClubTournaments = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as User;

    const tournaments = await prisma.tournament.findMany({
      where: {
        clubId: user.clubId as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        time: true,
        rounds: true,
        participants: {
          select: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(tournaments);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
