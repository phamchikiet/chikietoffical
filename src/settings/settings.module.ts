import { Module } from '@nestjs/common';
import { SettingService } from './settings.service';
import { SettingController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingEntity } from './entities/setting.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity]), SettingModule],
  controllers: [SettingController],
  providers: [SettingService]
})
export class SettingModule {}



