import { 
  Controller, Post, Body, Get, Query, Param, Delete, UseInterceptors, UploadedFile,UseGuards, Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { extname } from 'path';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
@Post('create-review')
async createReview(@Request() req, @Body() dto: CreateReviewDto) {
  const userId = req.user.sub; // or req.user.userId – depends on your JWT payload
  return this.userService.createReview(userId, dto);
}
  @Post('signup')
  createAccount(@Body() data: UserDTO) {
    return this.userService.createAccount(data);
  }


  @Get('search')
  findByName(@Query('name') name: string) {
    return this.userService.findByNameSubstring(name);
  }

  
  @Get('profile/:username')
  getProfile(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

 
 @Delete('remove/:username')
removeUser(@Param('username') username: string) {
  
  return this.userService.removeByUsername(username);
}


  @Post('upload-document')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(pdf)$/)) cb(null, true);
      else cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
    },
    limits: { fileSize: 2000000 }, 
    storage: diskStorage({
      destination: './uploads/docs',
      filename: (req, file, cb) => {
        cb(null, Date.now() + extname(file.originalname));
      },
    }),
  }))
  uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadDocument(file.filename);
  }
  /*// Create a booking (user must be logged in)
  @UseGuards(JwtAuthGuard)
  @Post('create-booking')
  createBooking(@Request() req, @Body() dto: CreateBookingDto) {
    // req.user contains { sub: userId, ... } from JWT payload
    const userId = req.user.sub;  // or req.user.userId depending on your JWT payload
    return this.userService.createBooking(userId, dto);
  }

  // Get my bookings
  @UseGuards(JwtAuthGuard)
  @Get('my-bookings')
  getMyBookings(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getUserBookings(userId);
  }

  // Cancel a booking
  @UseGuards(JwtAuthGuard)
  @Delete('cancel-booking/:bookingId')
  cancelBooking(@Request() req, @Param('bookingId') bookingId: number) {
    const userId = req.user.sub;
    return this.userService.cancelBooking(bookingId, userId);
  }
  // @UseGuards(JwtAuthGuard)
  */
 @UseGuards(JwtAuthGuard)
@Post('create-booking')
createBooking(@Body() dto: CreateBookingDto) {
  const userId = '6961'; // Use an existing user id from your DB
  return this.userService.createBooking(userId, dto);
}

@UseGuards(JwtAuthGuard)
@Get('my-bookings')
getMyBookings() {
  const userId = '6961';
  return this.userService.getUserBookings(userId);
}

@UseGuards(JwtAuthGuard)
@Delete('cancel-booking/:bookingId')
cancelBooking(@Param('bookingId') bookingId: number) {
  const userId = '6961';
  return this.userService.cancelBooking(bookingId, userId);
}
}

