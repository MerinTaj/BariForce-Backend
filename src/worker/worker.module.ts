import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { workerController } from './worker.controller';
import { workerService } from './worker.service';
import { Worker } from './entities/worker.entity';
import { WorkerService as WorkerServiceEntity } from './entities/worker-service.entity';
import { Availability } from './entities/availability.entity';
import { Booking } from './entities/booking.entity';
import { Earning } from './entities/earning.entity';
import { PayoutMethod } from './entities/payout-method.entity';
import { Review } from './entities/review.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Worker, WorkerServiceEntity, Availability, Booking, Earning, PayoutMethod,
      Review]),
    AuthModule,
  ],
  controllers: [workerController],
  providers: [workerService],
})
export class workerModule {}