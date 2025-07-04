import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
    @ApiProperty({ description: "The user's first name" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: "The user's last name" })
    @IsNotEmpty()
    @IsString()
    @Length(11)
    phone: string;

    @ApiProperty({ description: "The user's email address" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The user's cpf address" })
    @IsNotEmpty()
    @Length(11)
    cpf: string;

    @ApiProperty({ description: "The user's password" })
    @IsNotEmpty()
    @Length(6, 100)
    password: string;

    @ApiProperty({
        description: "The user's role",
        example: 'admin',
    })
    @IsNotEmpty()
    @IsEnum(['admin', 'superAdmin'], { message: 'role must be admin or superAdmin' })
    role: 'admin' | 'superAdmin';
}