import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterWorkerDto } from './dto/register-worker.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-worker')
  @UsePipes(new ValidationPipe({ transform: true }))
  registerWorker(@Body() dto: RegisterWorkerDto) {
    return this.authService.registerWorker(dto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() dto: LoginDto) {
    return this.authService.loginWorker(dto);
  }

  @Post('login-user')
async loginUser(@Body() dto: LoginDto) {
  return this.authService.loginUser(dto);
}
}