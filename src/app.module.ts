import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
import { TodoModule } from './todo/todo.module';
import { TodocategoryModule } from './todocategory/todocategory.module';
import { CategoryModule } from './category/category.module';
import { GoogledriveModule } from './shared/googledrive/googledrive.module';
import { UploadModule } from './upload/upload.module';
import { HighlightModule } from './highlight/highlight.module';
import { DexuatModule } from './dexuat/dexuat.module';
import { SettingModule } from './settings/settings.module';
import { AclModule } from './acl/acl.module';
import { ConversationModule } from './conversations/conversations.module';
import { MenuModule } from './menu/menu.module';
@Module({
  imports: [
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
    HoadonchitietModule,
    TodoModule,
    TodocategoryModule,
    CategoryModule,
    GoogledriveModule,
    UploadModule,
    HighlightModule,
    DexuatModule,
    SettingModule,
    AclModule,
    ConversationModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}