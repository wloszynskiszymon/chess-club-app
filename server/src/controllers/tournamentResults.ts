import { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { Tournament } from '@prisma/client';

export const createTournamentResults = async (req: Request, res: Response) => {
  try {
    const results = req.body;

    if (!results) {
      return res.status(400).json({ message: 'No results provided' });
    }

    const tournamentId = req.params.tournamentId;
    const tournament = res.locals.tournamentId as Tournament;

    const participants = await prisma.tournamentParticipant.findMany({
      where: { tournamentId },
      select: { id: true, userId: true },
    });

    const resultsData = participants.map(participants => {
      const participantResults = results[participants.userId];
      return {
        tournamentId,
        participantId: participants.id,
        wins: participantResults.wins || 0,
        losses: participantResults.losses || 0,
        draws: participantResults.draws || 0,
        rating: participantResults.rating || 0,
        gamesPlayed: +tournament.rounds,
      };
    });

    await prisma.tournamentResult.createMany({
      data: resultsData,
    });

    return res.status(201).json({ message: 'Results saved' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTournamentResults = async (req: Request, res: Response) => {
  try {
    const tournamentId = req.params.tournamentId;

    const participants = await prisma.tournamentResult.findMany({
      where: { tournamentId },
    });

    return res.status(200).json(participants);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Could be way more optimized in the future
export const updateTournamentResults = async (req: Request, res: Response) => {
  try {
    const tournamentId = req.params.tournamentId;
    const tournament = res.locals.tournament as Tournament;

    const participants = await prisma.tournamentParticipant.findMany({
      where: { tournamentId },
      select: { id: true, userId: true },
    });

    const existingResults = await prisma.tournamentResult.findMany({
      where: { tournamentId },
    });

    // Update only changed results
    const resultsData = participants
      .map(participant => {
        const participantResults = req.body[participant.userId];
        const existingResult = existingResults.find(
          result => result.participantId === participant.id
        );

        if (
          existingResult &&
          existingResult.wins === participantResults.wins &&
          existingResult.losses === participantResults.losses &&
          existingResult.draws === participantResults.draws &&
          existingResult.rating === participantResults.rating
        ) {
          return null;
        }

        return {
          id: existingResult?.id,
          tournamentId,
          participantId: participant.id,
          wins: participantResults.wins,
          losses: participantResults.losses,
          draws: participantResults.draws,
          rating: participantResults.rating,
          gamesPlayed: tournament.rounds,
        };
      })
      .filter(result => result !== null);

    // Update only changed results
    for (const result of resultsData) {
      await prisma.tournamentResult.update({
        where: { id: result.id },
        data: {
          wins: result.wins,
          losses: result.losses,
          draws: result.draws,
          rating: result.rating,
        },
      });
    }

    return res.status(200).json({ message: 'Results updated successfully!' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};
