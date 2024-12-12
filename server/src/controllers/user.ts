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
      club: true,
    },
  });

  return user;
};
