import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/jwt';
import { filterUserSensetiveData } from '../middleware/user';

const userRouter = express.Router();

userRouter.get(
  '/me',
  authenticate,
  filterUserSensetiveData,
  (req: Request, res: Response) => {
    res.status(200).json({ ...res.locals.user });
  }
);

export default userRouter;
