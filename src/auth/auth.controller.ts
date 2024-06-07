import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from '../decorators/decorators';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() createUserDto: CreateUserDto) {
    const login = await this.authService.signIn(createUserDto);
    return login;
  }
}
