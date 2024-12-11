import { ZodError, ZodIssueCode } from 'zod';
import { ZodIssue } from 'zod-validation-error';

export function generateZodIssue(
  path: (string | number)[],
  message: string,
  code: ZodIssueCode = ZodIssueCode.custom
): ZodError {
  const issue: ZodIssue = {
    code: code && ZodIssueCode.custom,
    path,
    message,
  };

  return new ZodError([issue]);
}
