import { NextFunction, Request, Response } from 'express';
import { mailSchema } from '../zod/mailSchema';
import { ZodError } from 'zod';

export const validateMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await mailSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(409).send({ errors: err.flatten().fieldErrors });
    }
    return res.status(500).send({ message: 'Error validating user', err });
  }
};
