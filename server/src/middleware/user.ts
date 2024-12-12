import { NextFunction, Request, Response } from 'express';

export const filterUserSensetiveData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) return res.status(500).send({ message: 'Error validating user' });

  const filteredUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: user.birthdate,
    role: user.role,
  } satisfies SafeUser;

  res.locals.user = filteredUser;
  next();
};
