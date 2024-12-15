import { HttpStatus, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RtoMaster } from './entities/rtomaster.entity';
import * as path from 'path';
import * as fs from 'fs';

export interface RtoMasterData {
  CITY: string;
  RTO: string;
}

@Injectable()
export class RtomasterService {
  constructor(
    @InjectRepository(RtoMaster)
    private readonly rtoMasterRepository: Repository<RtoMaster>,
  ) {}

  async importRtoMasterData() {
    try {
      const baseDir =
        process.env.NODE_ENV === 'production'
          ? path.resolve(__dirname, '..', 'excelSheets')
          : path.resolve(__dirname, '..', '..', 'src', 'excelSheets');

      const filePath = path.join(baseDir, 'rtoMaster.xlsx');

      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const data: RtoMasterData[] = XLSX.utils.sheet_to_json(worksheet);

      // Check if data is empty
      if (!data || data.length === 0) {
        throw new Error('No data found in the Excel sheet');
      }

      for (const row of data) {
        const { CITY, RTO } = row;

        const rtoMaster = new RtoMaster();
        rtoMaster.city = CITY.trim(); // Trim the city
        rtoMaster.rto = RTO.trim();

        // Save to the database
        await this.rtoMasterRepository.save(rtoMaster);
      }

      return { message: 'Data imported successfully' };
    } catch (error) {
      console.error('Error importing data from Excel:', error);
      throw new Error(`Error importing data from Excel: ${error.message}`);
    }
  }

  //Get data from db
  async getRtoDataFromDB() {
    try {
      const rtoMasterData = await this.rtoMasterRepository.find();

      if (!rtoMasterData || rtoMasterData.length == 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No data found',
        };
      }

      return rtoMasterData;
    } catch (error) {
      throw error;
    }
  }

  async findByRto(rto: string) {
    try {
      const data = await this.rtoMasterRepository.findOne({ where: { rto } });

      if (!data) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'No data found',
        };
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  //Reading from file
  async readRtoMasterDataFromFile(): Promise<RtoMasterData[]> {
    try {
      const baseDir =
        process.env.NODE_ENV === 'production'
          ? path.resolve(__dirname, '..', 'excelSheets')
          : path.resolve(__dirname, '..', '..', 'src', 'excelSheets');
      const filePath = path.join(baseDir, 'rtoMaster.xlsx');

      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const data: RtoMasterData[] = XLSX.utils.sheet_to_json(worksheet);

      return data;
    } catch (error) {
      console.error('Error reading data from Excel:', error);
      throw new Error('Error reading data from Excel');
    }
  }
}
