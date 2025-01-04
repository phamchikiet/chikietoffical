/// <reference types="multer" />
import { CreateGoogledriveDto } from './dto/create-googledrive.dto';
import { UpdateGoogledriveDto } from './dto/update-googledrive.dto';
import { drive_v3 } from 'googleapis';
export declare class GoogledriveService {
    private driveClient;
    constructor();
    create(createGoogledriveDto: CreateGoogledriveDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGoogledriveDto: UpdateGoogledriveDto): string;
    remove(id: number): string;
    uploadFileFromBuffer(file: Express.Multer.File, folderId?: string): Promise<drive_v3.Schema$File>;
    getFileList(): Promise<any>;
    deleteFile(fileId: string): Promise<any>;
}
