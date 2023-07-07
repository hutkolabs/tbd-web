import { ValidationError } from 'class-validator';

const getRealTarget = (error: ValidationError) => {
  if (Array.isArray(error.target)) {
    return error.target[error.property as keyof typeof error.target];
  }

  return error.target;
};

/**
 *
 * @param errors
 * @returns error if target of error has no 'error' property
 */
export const injectValidationError = (errors: Array<ValidationError>): Array<ValidationError> => {
  return errors
    .map(error => {
      if (!error.children) {
        throw new Error('error.children is undefined', { cause: error });
      }
      if (!error.target) {
        throw new Error('error.target is undefined', { cause: error });
      }

      if (error.children.length > 0) {
        error.children = injectValidationError(error.children);

        if (error.children.length) {
          return error;
        }
      } else {
        const realTarget = getRealTarget(error);

        if (Object.hasOwnProperty.call(realTarget, 'error')) {
          realTarget.error = error;

          return undefined;
        }

        return error;
      }
    })
    .filter(Boolean);
};
