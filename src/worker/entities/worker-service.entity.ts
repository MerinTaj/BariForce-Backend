import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Worker } from './worker.entity';

@Entity('worker_services')
export class WorkerService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  durationMinutes: number;

  @ManyToOne(() => Worker, (worker) => worker.services, { onDelete: 'CASCADE' })
  worker: Worker;
}