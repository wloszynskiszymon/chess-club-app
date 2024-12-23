import express from 'express';
import { authenticate } from '../middleware/jwt';
import {
  createTournament,
  deleteTournament,
  updateTournament,
} from '../controllers/tournament';
import { validateTournamentData } from '../middleware/tournament';
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

export default tournamentRouter;
