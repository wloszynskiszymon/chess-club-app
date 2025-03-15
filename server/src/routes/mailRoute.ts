import { Router } from 'express';
import { authenticate } from '../middleware/jwt';
import {
  getMails,
  sendMail,
  saveMail,
  getMailCounts,
  setMailAsRead,
  getMailDetails,
} from '../controllers/mail';
import { validateMail } from '../middleware/mail';

export const mailRouter = Router();

mailRouter.get('/', authenticate, getMails);
mailRouter.get('/counts', authenticate, getMailCounts);
mailRouter.post('/send', authenticate, validateMail, sendMail);
mailRouter.get('/:id', authenticate, getMailDetails);
mailRouter.patch('/:id/save', authenticate, saveMail);
mailRouter.patch('/:id/read', authenticate, setMailAsRead);
