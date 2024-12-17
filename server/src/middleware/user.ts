import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma/prisma';

export const filterUserSensetiveData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) return res.status(500).send({ message: 'Error validating user' });

  const club = await prisma.club.findUnique({
    where: { id: user.clubId },
    include: {
      members: true,
    },
  });

  if (!club) return res.status(500).send({ message: 'Error validating club' });

  const filteredUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: user.birthdate,
    role: user.role,
    club: {
      id: club.id,
      name: club.name,
      members: club.members,
    },
    clubId: user.clubId,
  } satisfies SafeUser;

  res.locals.user = filteredUser;
  next();
};
