import { ZodIssueCode } from 'zod';

export type CustomZodError = {
  path: string[];
  message: String;
  code: ZodIssueCode;
};

export type CustomZodIssue = {
  issues: CustomZodError[];
  name: string;
};

export type ServerZodSyledError = {
  errors: CustomZodIssue;
};
