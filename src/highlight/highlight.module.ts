import { Module } from '@nestjs/common';
import { HighlightService } from './highlight.service';
import { HighlightController } from './highlight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighlightEntity } from './entities/highlight.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HighlightEntity]), HighlightModule],
  controllers: [HighlightController],
  providers: [HighlightService]
})
export class HighlightModule {}



