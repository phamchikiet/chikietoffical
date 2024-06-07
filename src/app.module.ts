import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.221.221.14',
      port: 3306,
      username: 'jtnkwfpz_chikiet88',
      password: '@Hikiet1988',
      database: 'jtnkwfpz_chikiet',
      autoLoadEntities: true,
      synchronize: true,
      charset: "utf8mb4",
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
