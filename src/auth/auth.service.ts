import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worker } from '../worker/entities/worker.entity';
import { RegisterWorkerDto } from './dto/register-worker.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JWT_EXPIRES_IN, JWT_SECRET } from './auth.constants';
import { UserEntity } from '../user/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Worker)
    private readonly workerRepo: Repository<Worker>,
    @InjectRepository(UserEntity) 
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailService: MailService,

  ) {}

  async registerWorker(dto: RegisterWorkerDto) {
    const existingWorker = await this.workerRepo.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    });

    if (existingWorker) {
      throw new BadRequestException('Worker with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newWorker = this.workerRepo.create({
      fullname: dto.fullname,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      phone: dto.phone,
      gender: dto.gender,
      workertype: dto.workertype,
      isActive: true,
      verificationStatus: 'pending',
    });

    const savedWorker = await this.workerRepo.save(newWorker);
   console.log('Attempting to send email to:', savedWorker.email);
this.mailService.sendWelcomeEmail(savedWorker).catch(err => {
  console.error('Failed to send welcome email:', err);
});

  const { password, ...result } = savedWorker;

  return {
    message: 'Worker registered successfully',
    data: result,
  };
  }
  async loginUser(dto: LoginDto) {
  const user = await this.userRepo.findOne({
  where: { username: dto.usernameOrEmail }
});

  if (!user) throw new UnauthorizedException('Invalid credentials');
  
  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
  
  const payload = { sub: user.id, role: 'user' };
  const token = this.jwtService.sign(payload);
  return { access_token: token };
}
  async loginWorker(dto: LoginDto) {
    const worker = await this.workerRepo.findOne({
      where: [{ email: dto.usernameOrEmail }, { username: dto.usernameOrEmail }],
    });

    if (!worker) {
      throw new UnauthorizedException('Invalid email/username or password');
    }
    if (!worker.isActive) {
    throw new UnauthorizedException('Account is deactivated. Please contact support.');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, worker.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email/username or password');
    }

    const payload = {
      email: worker.email,
      sub: worker.id,
      role: 'worker',
      username: worker.username,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    });

    return {
      message: 'Login successful',
      data: {
        token,
        name: worker.fullname,
        workerId: worker.id,
      },
    };
  }
}