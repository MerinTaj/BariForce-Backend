import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { AdminEntity } from '../admin/admin.entity';

@Entity()
export class Worker {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fullname: string;

  @Column({ type: 'bigint' })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  //Many Worker → One User
  @ManyToOne(() => UserEntity, (user) => user.workers) 
  //One Worker → One Admin
  @OneToOne(() => AdminEntity)
  @JoinColumn()
  admin: AdminEntity;
}