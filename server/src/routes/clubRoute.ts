import express from 'express';
import { authenticate } from '../middleware/jwt';
import { createClub, getSafeClubs, joinClub } from '../controllers/club';

const clubRouter = express.Router();

// Route to create a new club
clubRouter.post('/', authenticate, createClub);
clubRouter.get('/', authenticate, getSafeClubs);
clubRouter.post('/:clubId/join', authenticate, joinClub);

export default clubRouter;
