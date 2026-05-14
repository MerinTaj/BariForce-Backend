import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Worker } from './worker.entity';
import { Booking } from './booking.entity';
import { UserEntity } from '../../user/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  rating: number; // 1-5 star rating

  @Column({ type: 'text' })
  comment: string;

  @Column({ type: 'text', nullable: true })
  reply: string; // Worker or Admin can reply

  @CreateDateColumn()
  createdAt: Date;

  // Relation: Many Reviews belong to One Worker
  @ManyToOne(() => Worker, (worker) => worker.reviews, { onDelete: 'CASCADE' })
  worker: Worker;

  // Relation: One Review belongs to One Booking (optional but logical)
  @OneToOne(() => Booking, { nullable: true })
  @JoinColumn()
  booking: Booking;

  // Relation: Many Reviews belong to One User (who wrote the review)
  @ManyToOne(() => UserEntity, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: UserEntity;
}