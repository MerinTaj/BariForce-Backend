import { IsEmail, IsNotEmpty, IsString, Matches, Length, IsIn, IsOptional } from 'class-validator';

export class RegisterWorkerDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[@#$&]).+$/, { message: 'Password must contain at least one special character (@ or # or $ or &)' })
  @Length(6, 20)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, { message: 'Phone must contain only digits' })
  @Length(11, 11)
  phone: string;

  @IsOptional()
  @IsIn(['male', 'female'])
  gender?: string;

  @IsOptional()
  @IsString()
  workertype?: string;
}