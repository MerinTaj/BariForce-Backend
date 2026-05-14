import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Booking } from './booking.entity';
import { Worker } from './worker.entity';

@Entity('earnings')
export class Earning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingId: number;

  @Column()
  workerId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  platformFee: number;

 @Column({ type: 'decimal', precision: 10, scale: 2 })
  netAmount: number;  

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true, type: 'timestamp' })
  paidAt: Date;

  @Column({ nullable: true })
  payoutId: string;

  @OneToOne(() => Booking)
  @JoinColumn()
  booking: Booking;

  @ManyToOne(() => Worker, (worker) => worker.earnings)
  worker: Worker;
}