import { ZodIssueCode } from 'zod';

// Represents a single issue in a Zod validation error.
export type ValidationIssue = {
  path: string[];
  message: string; // Use lowercase "string" for consistency.
  code: ZodIssueCode;
};

// Represents a collection of validation issues from the server.
export type ServerValidationIssues = {
  issues: ValidationIssue[];
  name: string;
};

// Represents validation errors as a key-value mapping from the server.
export type ServerValidationErrors = {
  errors: ServerValidationIssues;
};

// Represents flattened validation errors mapped to a schema's fields.
export type FlattenedValidationErrors<TSchema> = {
  errors: Partial<Record<keyof TSchema, string[]>>;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  role: string;
  club: string;
};
