import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() createUserDto: CreateUserDto) {
    const login = await this.authService.signIn(createUserDto);
    return login;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return true;
  }
}
