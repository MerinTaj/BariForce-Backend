import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Worker } from './worker.entity';

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  dayOfWeek: number;

  @Column({ type: 'time', nullable: true })
  startTime: string;

  @Column({ type: 'time', nullable: true })
  endTime: string;

  @Column({ default: true })
  isRecurring: boolean;

  @Column({ type: 'date', nullable: true })S
  specificDate: Date;

  @Column({ default: false })
  isBlocked: boolean;

  @ManyToOne(() => Worker, (worker) => worker.availabilitySlots, { onDelete: 'CASCADE' })
  worker: Worker;
}