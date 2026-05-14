import {
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsNotEmpty,
  IsIn,
} from 'class-validator';

export class AdminDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'Full name cannot exceed 100 characters' })
  fullName: string;

  @IsInt()
  @Min(0, { message: 'Age must be a positive number' })
  age: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['active', 'inactive'], {
    message: 'Status must be either active or inactive',
  })
  status: string;
}
