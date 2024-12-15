import { Module } from '@nestjs/common';
import { VehicleMasterService } from './vehicle-master.service';
import { VehicleMasterController } from './vehicle-master.controller';

@Module({
  providers: [VehicleMasterService],
  controllers: [VehicleMasterController]
})
export class VehicleMasterModule {}
