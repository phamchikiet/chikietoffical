import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
import { UsersEntity } from './users/entities/user.entity';
@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url:"postgresql://admin:vyAg5HdyTgkZCvchZeCzcorm5Qq7vJ2R@dpg-cpvbmp3v2p9s7399peig-a.singapore-postgres.render.com/csvc?sslmode=require",
    //   // url:"postgres://default:QKsghOH17GBE@ep-crimson-haze-a10m0yu9.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
    //   autoLoadEntities: true,
    //   entities: [UsersEntity],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.221.222.71',
      port: 3306,
      username: 'tazaspac_chikiet',
      password: '@Hikiet88',
      database: 'tazaspac_testblog',
      autoLoadEntities: true,
      synchronize: true,
      charset: "utf8mb4",
    }),
    UsersModule,
    // HoadonchitietModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}