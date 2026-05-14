import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Worker } from '../worker/entities/worker.entity';
import { Booking } from '../worker/entities/booking.entity';
import { Review } from '../worker/entities/review.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullName: string;
  
  @Column({ nullable: true })
password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Worker, (worker) => worker.user)
  workers: Worker[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  // Public method to generate ID
  generateId() {
    this.id = '' + Math.floor(Math.random() * 10000);
  }
}