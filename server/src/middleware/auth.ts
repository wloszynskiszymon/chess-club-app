import { Request, Response, NextFunction } from 'express';
import { RegisterSchema, registerSchema } from '../zod/registerSchema';
import { ZodError } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '../prisma/prisma';
import { generateZodIssue } from '../controllers/errors';

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
  try {
    if (!email || !password)
      return res.status(401).json({ message: 'No credentials provided!' });

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: generateZodIssue(['email'], 'No user with this email found'),
      });
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json({
        errors: generateZodIssue(['root'], 'Incorrect credentials'),
      });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  if (!req.cookies.refreshToken)
    return res.status(400).json({ message: 'No refresh token found' });
  res.clearCookie('refreshToken');
  return res.status(200).json({ message: 'Logged out successfully!' });
};
