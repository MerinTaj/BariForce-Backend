import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
export class AdminEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unsigned: true })
  age: number;

  @Column({ type: 'varchar', default: 'active' })
  status: string;
}
