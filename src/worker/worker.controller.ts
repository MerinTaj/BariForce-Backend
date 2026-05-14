import { Controller, Put, Get, Param, Post, Body, Delete, ParseIntPipe, UseGuards, Query, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { workerService } from './worker.service';
import { 
  WorkerDTO, DeactivateAccountDto, VerificationUploadDto, RescheduleBookingDto, 
  BulkActionDto, AvailabilitySlotDto, HolidayDto, PayoutRequestDto, 
  PayoutMethodDto, ReviewReplyDto, ChangePasswordDto, UpdatePhoneDto, 
  DeleteAccountDto
} from './worker.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';

@Controller('worker')
@UseGuards(JwtAuthGuard)  
export class workerController {
  constructor(private readonly workerService: workerService) { }

  @Post('create-profile')
  @UsePipes(new ValidationPipe({ transform: true }))
  createProfile(@Body() data: WorkerDTO) {
    return this.workerService.createProfile(data);
  }
  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
  return this.workerService.getProfile(id);
  }
  @Put('edit-profile/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  editProfile(@Param('id', ParseIntPipe) id: number, @Body() data: WorkerDTO) {
    return this.workerService.editProfile(id, data);
  }
  @Post('change-password-secure/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async changePasswordSecure(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: { currentPassword: string; newPassword: string }
  ) {
  return this.workerService.changePasswordSecure(id, dto.currentPassword, dto.newPassword);
  }

  @Post('payouts/withdraw')
  async withdraw(@Body() dto: { workerId: number; amount: number; password: string; paymentMethod: string; accountNumber: string }) {
  return this.workerService.withdraw(dto.workerId, dto.amount, dto.password, dto.paymentMethod, dto.accountNumber);
   }
  @Put('change-password/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  changePassword(@Param('id', ParseIntPipe) id: number, @Body() dto: ChangePasswordDto) {
    return this.workerService.changePassword(id, dto.newPassword);
  }

 @Delete('delete-account/:id')
async deleteAccount(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: DeleteAccountDto,
) {
  return this.workerService.deleteAccount(id, dto.password, dto.reason);
}
  @Put('accept-booking/:bookingId')
  acceptBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.workerService.acceptBooking(bookingId);
  }

  @Put('reject-booking/:bookingId')
  rejectBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.workerService.rejectBooking(bookingId);
  }

  @Put('start-job/:bookingId')
  startJob(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.workerService.startJob(bookingId);
  }

  @Put('end-job/:bookingId')
  endJob(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.workerService.endJob(bookingId);
  }

  @Get('earnings/:id')
  viewEarnings(@Param('id', ParseIntPipe) id: number) {
    return this.workerService.viewEarnings(id);
  }

  @Put('availability/:id')
  updateAvailability(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
    return this.workerService.updateAvailability(id, status);
  }

  @Put('update-phone/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePhone(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePhoneDto) {
    return this.workerService.updatePhone(id, dto.phone);
  }

  @Get('null-name')
  findNullNameWorkers() {
    return this.workerService.findWorkersWithNullName();
  }

  @Delete('delete/:id')
  deleteWorker(@Param('id', ParseIntPipe) id: number) {
    return this.workerService.deleteWorker(id);
  }

  @Post('deactivate/:id')
  deactivateAccount(@Param('id', ParseIntPipe) id: number, @Body() dto: DeactivateAccountDto) {
    return this.workerService.deactivateAccount(id, dto.reason);
  }

  @Post('verification/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  uploadVerification(@Param('id', ParseIntPipe) id: number, @Body() dto: VerificationUploadDto) {
    return this.workerService.uploadVerification(id, dto);
  } 
  @Patch('bookings/reschedule/:bookingId')
  @UsePipes(new ValidationPipe({ transform: true }))
  rescheduleBooking(@Param('bookingId', ParseIntPipe) bookingId: number, @Body() dto: RescheduleBookingDto) {
    return this.workerService.rescheduleBooking(bookingId, dto.newDateTime);
  }

  @Post('bookings/cancel/:bookingId')
  cancelBooking(@Param('bookingId', ParseIntPipe) bookingId: number, @Body('reason') reason: string) {
    return this.workerService.cancelBooking(bookingId, reason);
  }

  @Post('bookings/bulk-action')
  @UsePipes(new ValidationPipe({ transform: true }))
  bulkAction(@Body() dto: BulkActionDto) {
    return this.workerService.bulkAction(dto.bookingIds, dto.action);
  }

  @Get('availability/schedule/:id')
  getAvailability(@Param('id', ParseIntPipe) id: number) {
    return this.workerService.getAvailability(id);
  }

  @Post('availability/slots/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  addAvailabilitySlot(@Param('id', ParseIntPipe) id: number, @Body() dto: AvailabilitySlotDto) {
    return this.workerService.addAvailabilitySlot(id, dto);
  }

  @Put('availability/slot/:slotId')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateAvailabilitySlot(@Param('slotId', ParseIntPipe) slotId: number, @Body() dto: AvailabilitySlotDto) {
    return this.workerService.updateAvailabilitySlot(slotId, dto);
  }

  @Delete('availability/slot/:slotId')
  deleteAvailabilitySlot(@Param('slotId', ParseIntPipe) slotId: number) {
    return this.workerService.deleteAvailabilitySlot(slotId);
  }

  @Post('availability/holiday/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  addHoliday(@Param('id', ParseIntPipe) id: number, @Body() dto: HolidayDto) {
    return this.workerService.addHoliday(id, dto);
  }

  @Get('earnings/detailed/:id')
  getDetailedEarnings(@Param('id', ParseIntPipe) id: number, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.workerService.getDetailedEarnings(id, startDate, endDate);
  }

  @Post('payouts/request/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  requestPayout(@Param('id', ParseIntPipe) id: number, @Body() dto: PayoutRequestDto) {
    return this.workerService.requestPayout(id, dto);
  }

  @Put('payouts/method/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePayoutMethod(@Param('id', ParseIntPipe) id: number, @Body() dto: PayoutMethodDto) {
    return this.workerService.updatePayoutMethod(id, dto);
  }

  @Get('reviews/:id')
  getReviews(@Param('id', ParseIntPipe) id: number, @Query('rating') rating?: number) {
    return this.workerService.getReviews(id, rating);
  }

  @Post('reviews/:reviewId/reply')
  @UsePipes(new ValidationPipe({ transform: true }))
  replyToReview(@Param('reviewId', ParseIntPipe) reviewId: number, @Body() dto: ReviewReplyDto) {
    return this.workerService.replyToReview(reviewId, dto.reply);
  }

  @Post('reviews/request/:bookingId')
  requestReview(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.workerService.requestReview(bookingId);
  }
  @UseGuards(JwtAuthGuard)
@Get('booking-with-earning/:bookingId')
async getBookingWithEarning(@Param('bookingId', ParseIntPipe) bookingId: number) {
  return this.workerService.getBookingWithEarning(bookingId);
}
@Get('bookings/:workerId')
async getWorkerBookings(@Param('workerId', ParseIntPipe) workerId: number) {
  return this.workerService.getWorkerBookings(workerId);
}
}