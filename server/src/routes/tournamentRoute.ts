import express from 'express';
import { authenticate } from '../middleware/jwt';
import { createTournament, updateTournament } from '../controllers/tournament';
import { validateTournamentData } from '../middleware/tournament';
import { getClubTournaments } from '../controllers/tournament';

const tournamentRouter = express.Router();

// Create a new tournament
tournamentRouter.post(
  '/',
  authenticate,
  validateTournamentData,
  createTournament
);

// Create a new tournament
tournamentRouter.put(
  '/:tournamentId',
  authenticate,
  validateTournamentData,
  updateTournament
);

tournamentRouter.get('/', authenticate, getClubTournaments);

export default tournamentRouter;
