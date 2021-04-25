import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as dayjs from 'dayjs';

export function IsValidDate(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if(!value) return false
          return dayjs(value).isValid()
        }
      }
    });
  };
}