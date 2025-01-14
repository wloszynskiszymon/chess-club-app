import express from 'express';
import { authenticate } from '../middleware/jwt';
import {
  createTournament,
  createTournamentResults,
  deleteTournament,
  getTournamentResults,
  updateTournament,
} from '../controllers/tournament';
import {
  validateResultsData,
  validateTournamentData,
} from '../middleware/tournament';
import { getClubTournaments } from '../controllers/tournament';

const tournamentRouter = express.Router();

tournamentRouter.post(
  '/',
  authenticate,
  validateTournamentData,
  createTournament
);

tournamentRouter.put(
  '/:tournamentId',
  authenticate,
  validateTournamentData,
  updateTournament
);

tournamentRouter.delete('/:tournamentId', authenticate, deleteTournament);

tournamentRouter.get('/', authenticate, getClubTournaments);

tournamentRouter.post(
  '/:tournamentId/results',
  authenticate,
  validateResultsData,
  createTournamentResults
);

tournamentRouter.get(
  '/:tournamentId/results',
  authenticate,
  getTournamentResults
);

export default tournamentRouter;
