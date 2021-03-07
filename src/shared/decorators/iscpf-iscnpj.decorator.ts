import { VerifyDocument } from './../../utils/verify-document';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidCpfOrCnpj(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCpfOrCnpj',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const verifyDocument = new VerifyDocument();
          return verifyDocument.isValidCpfOrCnpj(value);
        }
      }
    });
  };
}

export function IsValidCpf(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCpf',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if(!value) return false
          const verifyDocument = new VerifyDocument();
          return verifyDocument.validCpf(value);
        }
      }
    });
  };
}


export function IsValidCnpj(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidCnpj',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const verifyDocument = new VerifyDocument();
          return verifyDocument.validCnpj(value);
        }
      }
    });
  };
}