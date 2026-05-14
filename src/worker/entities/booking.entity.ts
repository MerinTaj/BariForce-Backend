import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Worker } from './worker.entity';
import { Earning } from './earning.entity';
import { UserEntity } from '../../user/user.entity';  

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  user: UserEntity;   

  @Column()
  workerId: number;

  @Column()
  serviceId: number;

  @Column({ type: 'timestamp' })
  scheduledAt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  completionPhoto: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true, type: 'timestamp' })
  startedAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  completedAt: Date;

  @ManyToOne(() => Worker, (worker) => worker.bookings)
  worker: Worker;

  @OneToOne(() => Earning, (earning) => earning.booking)
  earning: Earning;
}