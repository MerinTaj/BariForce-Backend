import { IsString, Matches, Length, IsIn, IsOptional, IsArray, ArrayMinSize, IsObject, IsBoolean, IsInt, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class WorkerDTO {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  workertype: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@aiub\.edu$/, { message: 'Email must be in @aiub.edu format' })
  email: string;

  @IsString()
  @Length(6)
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  password: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: string;

  @IsString()
  @Matches(/^\d+$/, { message: 'Phone must contain only digits' })
  @Length(11, 11)
  phone: string;
}

export class DeactivateAccountDto {
  @IsOptional()
  @IsString()
  reason?: string;
}

export class VerificationUploadDto {
  @IsString()
  documentUrl: string;

  @IsString()
  documentType: string;
}

export class RescheduleBookingDto {
  @IsString()
  newDateTime: string;
}

export class BulkActionDto {
  @IsArray()
  @ArrayMinSize(1)
  bookingIds: number[];

  @IsIn(['accept', 'reject'])
  action: 'accept' | 'reject';
}

export class AvailabilitySlotDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek?: number;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  isRecurring?: boolean;

  @IsOptional()
  @IsString()
  specificDate?: string;
}

export class HolidayDto {
  @IsString()
  date: string;

  @IsString()
  reason: string;
}
export class DeleteAccountDto {
  @IsString()
  password: string;

  @IsString()
  reason: string;
}
export class PayoutMethodDto {
  @IsString()
  type: string;

  @IsObject()
  details: object;

  @IsBoolean()
  isDefault: boolean;
}

export class ReviewReplyDto {
  @IsString()
  reply: string;
}

export class ChangePasswordDto {
  @IsString()
  @Length(6)
  @Matches(/[A-Z]/, { message: 'New password must contain at least one uppercase letter' })
  newPassword: string;
}

export class UpdatePhoneDto {
  @IsString()
  @Matches(/^\d+$/, { message: 'Phone must contain only digits' })
  @Length(11, 11)
  phone: string;
}
export class PayoutRequestDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsString()
  password: string;   // add this
}
