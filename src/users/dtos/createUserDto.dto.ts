import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  role: string;

  @IsNumber()
  age: number;
}
