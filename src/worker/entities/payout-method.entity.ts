import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Worker } from './worker.entity';

@Entity('payout_methods')
export class PayoutMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'json' })
  details: object;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => Worker, (worker) => worker.payoutMethods, { onDelete: 'CASCADE' })
  worker: Worker;
}