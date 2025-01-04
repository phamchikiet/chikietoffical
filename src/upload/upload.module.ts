import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { GoogledriveService } from 'src/shared/googledrive/googledrive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from './entities/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  controllers: [UploadController],
  providers: [UploadService,GoogledriveService],
})
export class UploadModule {}
