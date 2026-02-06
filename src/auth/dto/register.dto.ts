import { IsEmail, IsEmpty, IsNotEmpty, IsString, IsEnum, MaxLength, MinLength, Matches } from "class-validator";
import { IsStrongPassword,} from "src/validators";

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class RegisterDto {

    @IsNotEmpty({
        message: "Email is required"
    })
    @IsEmail({},{
        message: "Invalid email format"
    })
    email: string;

    @IsNotEmpty({
        message: "Username is required"
    })
    @IsString()
    @MinLength(10, {
        message: "Username is too short. Minimum length is $constraint1 characters"
    })
    @MaxLength(25, {
        message: "Username is too long. Maximum length is $constraint1 characters"
    })
    @Matches(/(?=.*[A-Z])/, {
        message: "Username must contain at least one uppercase letter"
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, {
        message: "Name is too short. Minimum length is $constraint1 characters"
    })
    @MaxLength(100, {
        message: "Name is too long. Maximum length is $constraint1 characters"
    })
    name: string;

    @IsStrongPassword({
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
        requireSpecialChar: true
    })
    password: string;

    @IsEnum(Role)
    role: Role;

}