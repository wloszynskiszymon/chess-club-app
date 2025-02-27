import { Router } from 'express';
import { authenticate } from '../middleware/jwt';
import {
  getMails,
  sendMail,
  saveMail,
  getMailCounts,
  setMailAsRead,
} from '../controllers/mail';
import { validateMail } from '../middleware/mail';

export const mailRouter = Router();

mailRouter.get('/', authenticate, getMails);
mailRouter.get('/counts', authenticate, getMailCounts);
mailRouter.post('/send', authenticate, validateMail, sendMail);
mailRouter.post('/:id/save', authenticate, saveMail);
mailRouter.post('/:id/read', authenticate, setMailAsRead);
