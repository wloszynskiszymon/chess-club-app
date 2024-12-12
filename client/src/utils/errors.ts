import { toast } from 'sonner';
import {
  FlattenedValidationErrors,
  ServerValidationErrors,
} from '../types/zod';

// Thrown by server - created custom Zod errors that required special handling outside schema parsing
export const isServerValidationIssue = (
  error: unknown
): error is ServerValidationErrors => {
  // Check if error is an object with errors property - { errors }
  if (typeof error === 'object' && error !== null && 'errors' in error) {
    const errors = error.errors as unknown;
    // Check if errors is an object with name and issues properties
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

export const isFlattenedValidationError = <TSchema extends {}>(
  error: unknown
): error is FlattenedValidationErrors<TSchema> => {
  // Check if error is an object with an "errors" property
  if (typeof error === 'object' && error !== null && 'errors' in error) {
    const errors = (error as Record<string, unknown>).errors;

    // Validate that "errors" is an object
    if (typeof errors !== 'object' || errors === null) return false;

    // Validate that each value in "errors" is an array of strings
    if (
      Object.entries(errors).every(
        ([, value]) =>
          Array.isArray(value) && value.every(item => typeof item === 'string')
      )
    ) {
      return true;
    }
  }

  return false;
};

// Thrown by server - regular error message with message property
export const isErrorMessage = (
  error: unknown
): error is { message: string } => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

export const setValidationIssue = <TSchema>(
  errorData: ServerValidationErrors,
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

// Handles flattened validation errors.
export const setFlattenedValidationErrors = <TSchema>(
  errorData: FlattenedValidationErrors<TSchema>,
  setError: (
    fieldName: keyof TSchema,
    error: { type: string; message: string }
  ) => void
) => {
  Object.entries(errorData.errors).forEach(([key, messages]) => {
    const fieldName = key as keyof TSchema;
    if (Array.isArray(messages)) {
      setError(fieldName, {
        type: 'manual',
        message: messages[0],
      });
    }
  });
};

export const handleServerValidationErrors = <TSchema>(
  error: unknown,
  setError: (
    fieldName: keyof TSchema,
    error: { type: string; message: string }
  ) => void
) => {
  console.log(error);

  console.log('isServerValidationIssue', isServerValidationIssue(error));
  if (isServerValidationIssue(error)) {
    setValidationIssue<TSchema>(error, setError);
    return;
  }

  console.log('isFlattenedValidationError', isFlattenedValidationError(error));
  if (isFlattenedValidationError(error)) {
    setFlattenedValidationErrors<TSchema>(error, setError);
    return;
  }

  console.log('isErrorMessage', isErrorMessage(error));
  if (isErrorMessage(error)) {
    toast.error(error.message);
    return;
  }

  console.log("toast.error('An unexpected error occured')");
  toast.error('An unexpected error occured');
};
