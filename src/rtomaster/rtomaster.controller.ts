import { Controller, Get, Param, Post } from '@nestjs/common';
import { RtomasterService } from './rtomaster.service';

@Controller('rtomaster')
export class RtomasterController {
  constructor(private readonly rtoMasterService: RtomasterService) {}

  @Post('import')
  async importRtoMasterData() {
    try {
      const result = await this.rtoMasterService.importRtoMasterData();
      return { message: result.message };
    } catch (error) {
      console.error('Error importing RTO master data:', error);
      return { message: 'Error importing data', error: error.message };
    }
  }

  @Get('fetch/from/db')
  async getRtoDataFromDB() {
    try {
      const data = await this.rtoMasterService.getRtoDataFromDB();
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:rto')
  async findByRto(@Param('rto') rto: string) {
    try {
      const data = await this.rtoMasterService.findByRto(rto);
      return data;
    } catch (error) {
      throw error;
    }
  }

  @Get('data')
  async getRtoMasterData() {
    try {
      const data = await this.rtoMasterService.readRtoMasterDataFromFile();
      if (!data || data.length === 0) {
        return { message: 'No data available' };
      }
      return data;
    } catch (error) {
      console.error('Error fetching RTO master data:', error);
      return { message: 'Error fetching data', error: error.message };
    }
  }
}
