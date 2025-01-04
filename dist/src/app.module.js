"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const hoadonchitiet_module_1 = require("./hoadonchitiet/hoadonchitiet.module");
const todo_module_1 = require("./todo/todo.module");
const todocategory_module_1 = require("./todocategory/todocategory.module");
const category_module_1 = require("./category/category.module");
const googledrive_module_1 = require("./shared/googledrive/googledrive.module");
const upload_module_1 = require("./upload/upload.module");
const highlight_module_1 = require("./highlight/highlight.module");
const dexuat_module_1 = require("./dexuat/dexuat.module");
const settings_module_1 = require("./settings/settings.module");
const acl_module_1 = require("./acl/acl.module");
const conversations_module_1 = require("./conversations/conversations.module");
const menu_module_1 = require("./menu/menu.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
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
            users_module_1.UsersModule,
            hoadonchitiet_module_1.HoadonchitietModule,
            todo_module_1.TodoModule,
            todocategory_module_1.TodocategoryModule,
            category_module_1.CategoryModule,
            googledrive_module_1.GoogledriveModule,
            upload_module_1.UploadModule,
            highlight_module_1.HighlightModule,
            dexuat_module_1.DexuatModule,
            settings_module_1.SettingModule,
            acl_module_1.AclModule,
            conversations_module_1.ConversationModule,
            menu_module_1.MenuModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map