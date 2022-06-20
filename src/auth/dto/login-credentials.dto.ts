import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @Transform(({ value }) => value.trim())
  @IsEmail()
  @MinLength(4, { message: 'E-mail must be at least 4 characters long.' })
  email: string;

  @Transform(({ value }) => value.trim())
  @MinLength(5, { message: 'Password must be at least 5 characters long.' })
  password: string;
}
