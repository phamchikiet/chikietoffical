// import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
// import { GoogledriveService } from './googledrive.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import * as path from 'path';

// @Controller('googledrive')
// export class GoogledriveController {
//   constructor(private readonly googledriveService: GoogledriveService) {}

//     // @Post('upload')
//     // @UseInterceptors(FileInterceptor('file'))
//     // async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     //   const res = await this.googledriveService.uploadFile(file);
//     //   return res;
//     // }
  
//     @Post('upload/:folderId')
//     @UseInterceptors(FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads', // Nơi lưu trữ file tạm thời
//         filename: (req, file, cb) => {
//           const filename = `${Date.now()}-${file.originalname}`;
//           cb(null, filename);
//         },
//       }),
//     }))
//     async uploadFile(
//       @Param('folderId') folderId: string, // Nhận folderId từ params
//       @UploadedFile() file: Express.Multer.File,
//     ) {
//       console.log("UploadRun");
  
//       const filePath = path.join(__dirname, '../../../uploads', file.filename); // Đường dẫn tới file vừa upload tạm thời
//       const fileId = await this.googledriveService.uploadFile(filePath, folderId); // Sử dụng folderId động
//       return { fileId };
//     }





//     @Get()
//     async getFileList() {
//       console.log("Run");
      
//       const res = await this.googledriveService.getFileList();
//       console.log(res);
      
//       return res;
//     }
  
//     @Delete(':fileId')
//     async deleteFile(@Param('fileId') fileId: string) {
//       const res = await this.googledriveService.deleteFile(fileId);
//       return res;
//     }
  
//     // @Post('update/:fileId')
//     // @UseInterceptors(FileInterceptor('file'))
//     // async updateFile(@Param('fileId') fileId: string, @UploadedFile() file: Express.Multer.File) {
//     //   console.log(fileId);
//     //   console.log(file);
      
//     //   const res = await this.googledriveService.updateFile(fileId, file);
//     //   return res;
//     // }

//   // @Post()
//   // create(@Body() createGoogledriveDto: CreateGoogledriveDto) {
//   //   return this.googledriveService.create(createGoogledriveDto);
//   // }

//   // @Get()
//   // findAll() {
//   //   return this.googledriveService.findAll();
//   // }

//   // @Get(':id')
//   // findOne(@Param('id') id: string) {
//   //   return this.googledriveService.findOne(+id);
//   // }

//   // @Patch(':id')
//   // update(@Param('id') id: string, @Body() updateGoogledriveDto: UpdateGoogledriveDto) {
//   //   return this.googledriveService.update(+id, updateGoogledriveDto);
//   // }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.googledriveService.remove(+id);
//   // } 
// }
