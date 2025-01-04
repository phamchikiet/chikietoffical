/// <reference types="multer" />
import { GoogledriveService } from './googledrive.service';
export declare class GoogledriveController {
    private readonly googledriveService;
    constructor(googledriveService: GoogledriveService);
    uploadFile(file: Express.Multer.File, folderId: string): Promise<{
        fileId: import("googleapis").drive_v3.Schema$File;
    }>;
    getFileList(): Promise<any>;
    deleteFile(fileId: string): Promise<any>;
}
