import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Email/Username field is required' })
  usernameOrEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'Password field is required' })
  password: string;
}