import prisma from '../prisma/prisma';

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      email: true,
      birthdate: true,
      role: true,
      club: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return user;
};

export const getFullUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      club: true,
    },
  });

  return user;
};
