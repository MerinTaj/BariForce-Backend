import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Booking } from '../worker/entities/booking.entity';
import { AuthModule } from '../auth/auth.module';
import { Review } from '../worker/entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, Booking, Review]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}