import { Router } from 'express';
import { authenticate } from '../middleware/jwt';
import { getMails, sendMail } from '../controllers/mail';
import { validateMail } from '../middleware/mail';

export const mailRouter = Router();

mailRouter.get('/', authenticate, getMails);
mailRouter.post('/send', authenticate, validateMail, sendMail);
