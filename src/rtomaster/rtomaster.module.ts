import { Module } from '@nestjs/common';
import { RtomasterService } from './rtomaster.service';
import { RtomasterController } from './rtomaster.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RtoMaster } from './entities/rtomaster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RtoMaster])],
  providers: [RtomasterService],
  controllers: [RtomasterController]
})
export class RtomasterModule {}
