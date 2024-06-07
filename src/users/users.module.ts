import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { UsergroupModule } from 'src/usergroup/usergroup.module';
@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),UsergroupModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
