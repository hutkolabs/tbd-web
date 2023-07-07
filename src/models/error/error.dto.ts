import { ValidationError } from 'class-validator';

export class ErrorDto {
  error: ValidationError | null = null;
}
