import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
@Module({
  imports: [
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
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://admin:@Hikiet1988@cluster0.mkgmoln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    UsersModule,
    HoadonchitietModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}