import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class LoginUserDto {

    @IsString()
    @IsEmail()
    @ApiProperty({description:"Name of user in Login route"})
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a lowercase, uppercase letter and a number'
    })
    @ApiProperty({description:"Password of user in Login route"})
    password: string;

}