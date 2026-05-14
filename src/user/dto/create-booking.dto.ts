import { IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  workerId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsDateString()
  @IsNotEmpty()
  scheduledAt: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}