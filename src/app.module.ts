import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { workerModule } from './worker/worker.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Worker } from './worker/entities/worker.entity';
import { WorkerService } from './worker/entities/worker-service.entity';
import { Availability } from './worker/entities/availability.entity';
import { Booking } from './worker/entities/booking.entity';
import { Earning } from './worker/entities/earning.entity';
import { PayoutMethod } from './worker/entities/payout-method.entity';
import { Review } from './worker/entities/review.entity';
import { AdminEntity } from './admin/admin.entity';
import { UserEntity } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AdminModule,
    workerModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '97358',
      database: 'webtech',
      entities: [Worker, WorkerService, Availability, Booking, Earning, PayoutMethod, Review,
        AdminEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}