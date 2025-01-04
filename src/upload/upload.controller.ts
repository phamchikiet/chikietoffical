import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogledriveService } from 'src/shared/googledrive/googledrive.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly googledriveService: GoogledriveService,
  ) {}

  // Endpoint to create a new upload entry
  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  // Endpoint to upload a file to Google Drive
  @Post('googledrive')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folderId') folderId: string, // Receive folderId from query string
  ) {
    const result: any = await this.googledriveService.uploadFileFromBuffer(file, folderId);
    const data: any = {
      Title: file.originalname,
      fileId: result?.fileId,
      folderId: result?.folderId,
      Metadata: result?.Metadata,
      Type: 'googledrive',
    };
   const reponse = await this.uploadService.create(data);
    return reponse;
  }

  // Endpoint to retrieve all upload entries
  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  // Endpoint to update an upload entry by ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.uploadService.update(id, data);
  }

  // Endpoint to delete an upload entry by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(id);
  }
}
