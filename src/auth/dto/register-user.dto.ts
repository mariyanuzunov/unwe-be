import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @MinLength(4, { message: 'E-mail must be at least 4 characters long.' })
  email: string;

  @Transform(({ value }) => value.trim())
  @MinLength(5, { message: 'Password must be at least 5 characters long.' })
  password: string;

  @Transform(({ value }) => value.trim())
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  firstName: string;

  @Transform(({ value }) => value.trim())
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  lastName: string;

  @Transform(({ value }) => value.trim())
  @MinLength(9, { message: 'Phone number must be at least 9 characters long.' })
  phone: string;
}
