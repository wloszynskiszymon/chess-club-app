import { Request, Response, NextFunction } from 'express';
import { RegisterSchema, registerSchema } from '../zod/registerSchema';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../prisma/prisma';

// Middleware to validate the user registration data
export const validateRegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await registerSchema.parseAsync(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(409).send({ errors: err.flatten().fieldErrors });
    }
    return res.status(500).send({ message: 'Error validating user', err });
  }
};

// Middleware to hash the password before saving the user
export const prepareRegistrationData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body as RegisterSchema;
  const hashedPassword = await bcrypt.hash(user.password, 8);

  const newUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthdate: new Date(user.birthdate),
    password: hashedPassword,
    role: user.role,
  };

  req.body = newUser;

  next();
};

export const validateLoginCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  // Email, password
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: 'Incorrect credentials' });
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return res.status(401).json({ message: 'Incorrect credentials' });
  }

  next();
};
