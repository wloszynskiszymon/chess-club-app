import express from 'express';
import { authenticate } from '../middleware/jwt';
import {
  createTournament,
  deleteTournament,
  getTournament,
  updateTournament,
} from '../controllers/tournament';
import {
  findTournament,
  validateResultsData,
  validateTournamentData,
} from '../middleware/tournament';
import { getClubTournaments } from '../controllers/tournament';
import {
  createTournamentResults,
  getTournamentResults,
  getUserTournamentResult,
  updateTournamentResults,
} from '../controllers/tournamentResults';
import { coordinatorOnly } from '../middleware/role';

const tournamentRouter = express.Router();

tournamentRouter.get('/:tournamentId', authenticate, getTournament);

tournamentRouter.post(
  '/',
  authenticate,
  coordinatorOnly,
  validateTournamentData,
  createTournament
);

tournamentRouter.put(
  '/:tournamentId',
  authenticate,
  coordinatorOnly,
  findTournament,
  validateTournamentData,
  updateTournament
);

tournamentRouter.delete(
  '/:tournamentId',
  authenticate,
  coordinatorOnly,
  findTournament,
  deleteTournament
);

tournamentRouter.get('/', authenticate, getClubTournaments);

// Tournament results
tournamentRouter.get(
  '/:tournamentId/results',
  authenticate,
  getTournamentResults
);

tournamentRouter.get(
  '/:tournamentId/me/results',
  authenticate,
  getUserTournamentResult
);

tournamentRouter.post(
  '/:tournamentId/results',
  authenticate,
  coordinatorOnly,
  findTournament,
  validateResultsData,
  createTournamentResults
);

tournamentRouter.put(
  '/:tournamentId/results',
  authenticate,
  coordinatorOnly,
  findTournament,
  validateResultsData,
  updateTournamentResults
);

export default tournamentRouter;
