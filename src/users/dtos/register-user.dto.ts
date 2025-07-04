import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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

    @ApiProperty({ description: "The user's password" })
    @IsNotEmpty()
    @Length(6, 100)
    password: string;

    @ApiProperty({
        description: "The user's role",
        example: 'admin',
    })
    @IsNotEmpty()
    role: 'admin' | 'superAdmin';
}
