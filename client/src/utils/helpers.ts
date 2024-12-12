import { ServerZodSyledError } from '../types/zod';

export const isZodError = (error: unknown): error is ServerZodSyledError => {
  if (typeof error === 'object' && error !== null && 'errors' in error) {
    const errors = error.errors as unknown;
    if (
      typeof errors === 'object' &&
      errors !== null &&
      'name' in errors &&
      'issues' in errors
    ) {
      return true;
    }
  }
  return false;
};

export const isMessageError = (
  error: unknown
): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const setZodErrors = <TSchema>(
  errorData: ServerZodSyledError,
  setError: (
    fieldName: keyof TSchema,
    error: { type: string; message: string }
  ) => void
) => {
  errorData.errors.issues.forEach(({ path, message }) => {
    const fieldName = path[0] as keyof TSchema;
    setError(fieldName, {
      type: 'manual',
      message: message.toString(),
    });
  });
};
