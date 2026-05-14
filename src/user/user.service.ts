import { Injectable,NotFoundException, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm'; // Like ইম্পোর্ট নিশ্চিত করো
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { Booking } from '../worker/entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import * as bcrypt from 'bcryptjs';
import { Review } from '../worker/entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(Booking)  
    private bookingRepo: Repository<Booking>,
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) {}

  
  async searchByFullName(namePart: string): Promise<UserEntity[]> {
    return await this.userRepo.find({
      where: { fullName: Like(`%${namePart}%`) },
    });
  }

  
 async findByNameSubstring(namePart: string): Promise<UserEntity[]> {
    return await this.userRepo.find({
      where: { 
        fullName: Like(`%${namePart}%`) 
      },
    });
  }
  // Create a booking (by user)
  async createBooking(userId: string, dto: CreateBookingDto): Promise<Booking> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const booking = this.bookingRepo.create({
      user: user,
      workerId: dto.workerId,
      serviceId: dto.serviceId,
      scheduledAt: new Date(dto.scheduledAt),
      price: dto.price,
      status: 'pending'
    });
    return this.bookingRepo.save(booking);
  }

  // Get all bookings of a user (with worker relation)
  async getUserBookings(userId: string): Promise<Booking[]> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: ['worker']   
    });
  }

  // Cancel a booking prndingS
  async cancelBooking(bookingId: number, userId: string): Promise<{ message: string }> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['user']
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.user.id !== userId) throw new BadRequestException('Not your booking');
    if (booking.status !== 'pending') throw new BadRequestException('Only pending bookings can be cancelled');

    booking.status = 'cancelled';
    await this.bookingRepo.save(booking);
    return { message: 'Booking cancelled successfully' };
  }

  async findByUsername(uname: string): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ username: uname });
  }
  
  async removeByUsername(uname: string): Promise<any> {
    return await this.userRepo.delete({ username: uname });
  }

  
  uploadDocument(filename: string) {
    return { message: 'Uploaded', file: filename };
  }
  async createAccount(data: UserDTO): Promise<UserEntity> {
  const user = this.userRepo.create(data);
  user.generateId();   // custom ID generator
  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }
  return this.userRepo.save(user);
}
async createReview(userId: string, dto: CreateReviewDto): Promise<Review> {
  // 1. Find the booking
  const booking = await this.bookingRepo.findOne({
    where: { id: dto.bookingId },
    relations: ['user', 'worker'], // ensure user and worker are loaded
  });

  if (!booking) {
    throw new NotFoundException('Booking not found');
  }

  // 2. Verify the booking belongs to this user
  if (booking.user.id !== userId) {
    throw new BadRequestException('You can only review your own bookings');
  }

  // 3. Verify the booking is completed
  if (booking.status !== 'completed') {
    throw new BadRequestException('You can only review completed jobs');
  }

  // 4. Check if a review already exists for this booking (optional but good)
  const existingReview = await this.reviewRepo.findOne({
    where: { booking: { id: dto.bookingId } },
  });
  if (existingReview) {
    throw new BadRequestException('You have already reviewed this job');
  }

  // 5. Create the review
  const review = this.reviewRepo.create({
    rating: dto.rating,
    comment: dto.comment,
    worker: booking.worker,
    booking: booking,
    user: booking.user,
  });

  return this.reviewRepo.save(review);
}
}