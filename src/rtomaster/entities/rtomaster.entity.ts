import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rto_master')
export class RtoMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 20 })
  rto: string;
}
