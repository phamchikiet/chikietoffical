import { Module } from '@nestjs/common';
import { DexuatService } from './dexuat.service';
import { DexuatController } from './dexuat.controller';

@Module({
  controllers: [DexuatController],
  providers: [DexuatService],
})
export class DexuatModule {}
