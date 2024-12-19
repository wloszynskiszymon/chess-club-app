import express from 'express';
import { authenticate } from '../middleware/jwt';
import { createTournament } from '../controllers/tournament';
import { validateTournamentData } from '../middleware/tournament';

const tournamentRouter = express.Router();

// Create a new tournament
tournamentRouter.post(
  '/',
  authenticate,
  validateTournamentData,
  createTournament
);

export default tournamentRouter;
