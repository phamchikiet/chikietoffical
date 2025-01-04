/// <reference types="multer" />
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { GoogledriveService } from 'src/shared/googledrive/googledrive.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly googledriveService;
    constructor(uploadService: UploadService, googledriveService: GoogledriveService);
    create(createUploadDto: CreateUploadDto): Promise<any>;
    uploadFile(file: Express.Multer.File, folderId: string): Promise<any>;
    findAll(): Promise<import("./entities/upload.entity").UploadEntity[]>;
    update(id: string, data: any): Promise<import("./entities/upload.entity").UploadEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
