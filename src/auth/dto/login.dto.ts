import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
    username: string;

    @IsNotEmpty({
        message: "Password is required"
    })
    @IsString()
    password: string;
}