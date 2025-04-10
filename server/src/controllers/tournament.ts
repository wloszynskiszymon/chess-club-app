import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import moment from 'moment';

// GET /api/tournament
export const getTournament = async (req: Request, res: Response) => {
  try {
    const tournamentId = req.params.tournamentId;

    const tournament = await prisma.tournament.findFirst({
      where: {
        id: tournamentId as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        datetime: true,
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
            TournamentResult: {
              select: {
                participantId: true,
                wins: true,
                losses: true,
                draws: true,
                rating: true,
              },
            },
          },
        },
      },
    });

    if (!tournament) {
      return res
        .status(400)
        .json({ message: 'No tournament found with this id' });
    }

    const tournamentFormatted = {
      ...tournament,
      participants: tournament.participants.map(participant => ({
        ...participant.user,
        results: participant.TournamentResult,
      })),
    };

    return res.status(200).json(tournamentFormatted);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/tournament
export const createTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const user = res.locals.user as User;
    const data = req.body;

    const club = await prisma.club.findFirst({
      where: {
        id: user.clubId as string,
      },
      include: {
        members: true,
      },
    });

    if (!club) {
      return res.status(400).json({ message: 'Club not found' });
    }

    // Coordinator + two players
    if (club.members.length < 3) {
      return res
        .status(400)
        .json({ message: 'Club must have at least two players!' });
    }

    const createdTournament = await prisma.$transaction(async prisma => {
      // Create the tournament
      const tournament = await prisma.tournament.create({
        data: {
          title: data.title,
          description: data.description,
          datetime: data.datetime,
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

// PUT /api/tournament/:tournamentId
export const updateTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const data = req.body;
    const tournamentId = req.params.tournamentId;

    const updatedTournament = await prisma.tournament.update({
      data: {
        title: data.title,
        description: data.description,
        datetime: data.datetime,
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

// DELETE /api/tournament/:tournamentId
export const deleteTournament = async (req: Request, res: Response) => {
  try {
    // Fetch user and data from request
    const tournamentId = req.params.tournamentId;

    await prisma.tournament.delete({
      where: { id: tournamentId },
    });

    return res.status(200).json({ message: 'Tournament deleted' });
  } catch (e) {
    console.log('Error deleting tournament:', e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/tournament
export const getClubTournaments = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user as User;
    const { query } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const tournaments = await prisma.tournament.findMany({
      where: {
        clubId: user.clubId as string,
        title: {
          contains: query ? (query as string) : undefined,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        datetime: true,
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
      orderBy: {
        datetime: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return res.status(200).json(tournaments);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
