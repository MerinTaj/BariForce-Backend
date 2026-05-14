import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDTO } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { extname } from 'path';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getHello(): object {
    return this.adminService.getHello();
  }

  @Get('getall')
  getAll(): object {
    return this.adminService.getAll();
  }

  @Get('find/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): object {
    console.log(typeof id);
    return this.adminService.getAdminByID(id);
  }

  @Get('search')
  searchAdmin(@Query('name') name: string, @Query('id') id: number): object {
    return this.adminService.searchAdmin(name, id);
  }

  @Post('add')
  addAdmin(@Body() mydata: AdminDTO): object {
    return this.adminService.addAdmin(mydata);
  }

  @Patch('status/:id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.adminService.changeStatus(id, status);
  }

  @Get('inactive')
  getInactive() {
    return this.adminService.getInactiveAdmins();
  }

  @Get('older-than-40')
  getOlder() {
    return this.adminService.getOlderAdmins();
  }

  @Post('upload-nid')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/)) cb(null, true);
        else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads/nid',
        filename: (req, file, cb) => {
          cb(null, Date.now() + extname(file.originalname));
        },
      }),
    }),
  )
  uploadNID(@UploadedFile() file: Express.Multer.File): object {
    return this.adminService.uploadNID(file.filename);
  }
  @Put('update/:id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() mydata: AdminDTO,
  ): object {
    return this.adminService.updateAdmin(id, mydata);
  }

  @Delete('delete/:id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number): object {
    return this.adminService.deleteAdmin(id);
  }
}
