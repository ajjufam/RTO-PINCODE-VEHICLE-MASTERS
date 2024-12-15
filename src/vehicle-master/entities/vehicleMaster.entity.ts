import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vehicle_master')
export class VehicleMaster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  vehicleCode: string;

  @Column({ type: 'varchar', length: 50 })
  make: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'varchar', length: 50 })
  variant: string;

  @Column({ type: 'varchar', length: 15 })
  bodyType: string;

  @Column({ type: 'int' })
  seatingCapacity: number;

  @Column({ type: 'double' })
  power: number;

  @Column({ type: 'int' })
  cubicCapacity: number;

  @Column({ type: 'int' })
  grossVehicleWeight: number;

  @Column({ type: 'varchar', length: 20 })
  fuelType: string;

  @Column({ type: 'int' })
  noOfWheels: number;

  @Column({ type: 'char', length: 1 })
  abs: string;

  @Column({ type: 'int' })
  airBags: number;

  @Column({ type: 'double' })
  length: number;

  @Column({ type: 'double' })
  exShowroomPrice: number;

  @Column({ type: 'int' })
  priceYear: number;

  @Column({ type: 'varchar', length: 35 })
  production: string;

  @Column({ type: 'varchar', length: 4 })
  manufacturing: string;

  @Column({ type: 'varchar', length: 25 })
  vehicleType: string;
}
