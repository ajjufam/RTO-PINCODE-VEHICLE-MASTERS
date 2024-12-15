import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RtomasterModule } from './rtomaster/rtomaster.module';
import { RtoMaster } from './rtomaster/entities/rtomaster.entity';  // Import the entity
import { PinCodeMasterModule } from './pin-code-master/pin-code-master.module';
import { VehicleMasterModule } from './vehicle-master/vehicle-master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [RtoMaster],  
        synchronize: true, 
      }),
    }),
    RtomasterModule,
    PinCodeMasterModule,
    VehicleMasterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.log('Database connected successfully!');
  }
}
