import BigNumber from 'bignumber.js';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions
} from 'class-validator';

@ValidatorConstraint({ name: 'NumericIsNan', async: false })
export class IsNotNanBNConstraint implements ValidatorConstraintInterface {
  validate<T>(value: T, args: ValidationArguments) {
    if (BigNumber.isBigNumber(value)) {
      return !value.isNaN();
    }

    throw new Error(`${args.property} of ${args.object.constructor.name} is not a BigNumber`);
  }

  defaultMessage(args: ValidationArguments) {
    return `Property ${args.property} of ${args.targetName} cannot be converted to a number`;
  }
}

export const IsNotNanBN = (validationOptions?: ValidationOptions) => {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotNanBNConstraint
    });
  };
};
