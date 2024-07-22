import { Module } from '@nestjs/common';
import { TodocategoryService } from './todocategory.service';
import { TodocategoryController } from './todocategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodocategoryEntity } from './entities/todocategory.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TodocategoryEntity])],
  controllers: [TodocategoryController],
  providers: [TodocategoryService]
})
export class TodocategoryModule {}



