import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/user.entity';
import { UsergroupModule } from 'src/usergroup/usergroup.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './entities/jwt.strategy';
import { LocalStrategy } from './entities/local.strategy';
@Module({
  imports: [
  TypeOrmModule.forFeature([UsersEntity]),
  PassportModule,
  UsergroupModule,
  JwtModule.register({
    secret: 'websitetoken',
    signOptions: { expiresIn: '30days' },
  }),
  ],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,LocalStrategy]
})
export class UsersModule {}
