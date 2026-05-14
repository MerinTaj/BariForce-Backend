import { IsString, IsNotEmpty, MaxLength, IsBoolean, IsOptional } from 'class-validator';

export class UserDTO {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  username: string;
 @IsOptional()
  @IsString()
  @MaxLength(150)
  fullName: string;
@IsOptional()
@IsString()
password?: string;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}