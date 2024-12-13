import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/jwt';
import { createClub } from '../controllers/club';

const clubRouter = express.Router();

// Route to create a new club
clubRouter.post('/', authenticate, createClub);

export default clubRouter;
