import { Module } from '@nestjs/common';
import { HoadonchitietService } from './hoadonchitiet.service';
import { HoadonchitietController } from './hoadonchitiet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonchitietEntity } from './entities/hoadonchitiet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HoadonchitietEntity])],
  controllers: [HoadonchitietController],
  providers: [HoadonchitietService]
})
export class HoadonchitietModule {}



