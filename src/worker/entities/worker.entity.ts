import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Check, OneToMany,ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { WorkerService } from './worker-service.entity';
import { Availability } from './availability.entity';
import { Booking } from './booking.entity';
import { PayoutMethod } from './payout-method.entity';
import { Earning } from './earning.entity';
import { UserEntity } from '../../user/user.entity';
import { Review } from './review.entity';

@Entity('workers')
@Check(`"phone" > 0`)
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  fullname: string;

  @Column({ type: 'bigint', unsigned: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  workertype: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: false })
  isDeactivated: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  deletedAt: Date;

  @Column({ default: 'pending' })
  verificationStatus: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ type: 'json', nullable: true })
  serviceAreas: string[];

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'float', default: 0 })
  totalEarnings: number;
 @Column({ nullable: true })
  deletionReason: string;
  // RELATIONSHIPS
  @OneToMany(() => WorkerService, (service) => service.worker, { cascade: true })
  services: WorkerService[];

  @OneToMany(() => Availability, (slot) => slot.worker, { cascade: true })
  availabilitySlots: Availability[];

  @OneToMany(() => Booking, (booking) => booking.worker)
  bookings: Booking[];

  @OneToMany(() => PayoutMethod, (method) => method.worker, { cascade: true })
  payoutMethods: PayoutMethod[];
  
  @OneToMany(() => Review, (review) => review.worker)
  reviews: Review[];

  @OneToMany(() => Earning, (earning) => earning.worker)
  earnings: Earning[];

  @ManyToOne(() => UserEntity, (user) => user.workers)
  user: UserEntity;

  @BeforeInsert()
  generateId() {
    if (!this.id) this.id = Math.floor(Math.random() * 100);
  }
}