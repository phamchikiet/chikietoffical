import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
import { UsersEntity } from './users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:"postgres://default:QKsghOH17GBE@ep-crimson-haze-a10m0yu9.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
      autoLoadEntities: true,
      entities: [UsersEntity],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '103.221.221.14',
    //   port: 3306,
    //   username: 'jtnkwfpz_chikiet88',
    //   password: '@Hikiet1988',
    //   database: 'jtnkwfpz_chikiet',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   charset: "utf8mb4",
    // }),
    UsersModule,
    // HoadonchitietModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}