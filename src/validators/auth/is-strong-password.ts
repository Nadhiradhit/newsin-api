import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

interface StrongPasswordOptions {
    requireUppercase? : boolean;
    requireLowercase? : boolean;
    requireNumber? : boolean;
    requireSpecialChar? : boolean;
    minLength? : number;
}

@ValidatorConstraint({ name : "IsStrongPassword", async: false })
export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    private defaultOptions: StrongPasswordOptions = {
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
        requireSpecialChar: true,
        minLength: 8,
    }

    validate(password: string , args: ValidationArguments): boolean {
        const options : StrongPasswordOptions = {
            ...this.defaultOptions,
            ...(args.constraints[0] || {})
        }

        // Check minimum length
        if (password?.length < (options.minLength || 8)) {
            return false;
        }

        // Check for uppercase letters
        if (options.requireUppercase && !/[A-Z]/.test(password)) {
            return false;
        }

        if(options.requireLowercase && !/[a-z]/.test(password)){
            return false;
        }

        if(options.requireNumber && !/[0-9]/.test(password)){
            return false;
        }

        if(options.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)){
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments): any {
        const options : StrongPasswordOptions = {
            ...this.defaultOptions,
            ...(args.constraints[0] || {})
        }
        const config = {
            ...this.defaultOptions,
            ...options
        }

        const requirements: string[] = [];

        // Check minimum length
        if(config.minLength){
            requirements.push(`at least ${config.minLength} characters`);
        }

        // Check for lowercaseletters
        if(config.requireLowercase){
            requirements.push(`one lowercase letter (a-z)`);
        }

        // Check for Uppercaseletters
        if(config.requireUppercase){
            requirements.push(`one uppercase letter (A-Z)`);
        }

        // Check for numbers
        if(config.requireNumber){
            requirements.push(`one number (0-9)`);
        }

        // Check for special characters
        if(config.requireSpecialChar){
            requirements.push(`one special character like !@#$%^&*(),.?":{}|<>`);
        }

        return `Password must contain ${requirements.join(', ')}.`;
    }
}

export function IsStrongPassword(
    options?: StrongPasswordOptions,
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [options],
            validator: IsStrongPasswordConstraint,
        })
    }
}