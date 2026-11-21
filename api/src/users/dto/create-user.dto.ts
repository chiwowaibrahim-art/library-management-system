import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

import { Role } from '@prisma/client';

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;

}