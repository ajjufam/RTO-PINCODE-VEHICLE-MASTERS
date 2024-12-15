import { Module } from '@nestjs/common';
import { PinCodeMasterService } from './pin-code-master.service';
import { PinCodeMasterController } from './pin-code-master.controller';

@Module({
  providers: [PinCodeMasterService],
  controllers: [PinCodeMasterController]
})
export class PinCodeMasterModule {}
