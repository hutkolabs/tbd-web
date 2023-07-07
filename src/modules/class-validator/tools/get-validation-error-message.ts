import { ValidationError } from 'class-validator';

const getErrorMessage = (error: ValidationError): string => {
  let output = `${error.property}:\n `;

  if (error.constraints) {
    for (const constraint in error.constraints) {
      output += `- ${error.constraints[constraint]}\n `;
    }
  }

  if (error.children && error.children.length > 0) {
    for (const child of error.children) {
      output += getErrorMessage(child) + '\n ';
    }
  }

  return output;
};

export const getValidationErrorMessage = (errors: ValidationError[]): string => {
  return errors.reduce((result, issue) => {
    const issueStr = getErrorMessage(issue);

    return result + issueStr;
  }, 'Validation failed!\n ');
};
