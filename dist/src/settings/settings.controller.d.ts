import { SettingService } from './settings.service';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/setting.entity").SettingEntity[]>;
    findOne(id: string): Promise<import("./entities/setting.entity").SettingEntity>;
    findslug(slug: string): Promise<import("./entities/setting.entity").SettingEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/setting.entity").SettingEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/setting.entity").SettingEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
