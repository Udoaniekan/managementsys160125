import { MinLength, MaxLength, IsNotEmpty, IsEmail, Matches, IsOptional, IsString } from "class-validator";
import { userRole } from "../enum/user.role.enum";


export class CreateUserDto {
    @IsNotEmpty({message: "sorry this field cannot be empty"})
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8, {message: 'sorry you must put in 8 charaters'})
    @MaxLength(16, {message: 'passwords must not be more than 16 characters'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^da-zA-Z]).{8,}$/, {message: 'password must contain at least one uppercase,one lowercase and special characters'})
    password: string;
 
    @IsOptional()
    role: userRole
}
