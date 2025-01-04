import { Module } from '@nestjs/common';
import { GoogledriveService } from './googledrive.service';
import { GoogledriveController } from './googledrive.controller';

@Module({
  
  controllers: [GoogledriveController],
  providers: [GoogledriveService],
})
export class GoogledriveModule {}
