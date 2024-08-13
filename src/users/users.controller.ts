import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Public } from '../decorators/decorators';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET ROUTES

  @Get()
  getDashboard() {
    return this.usersService.getDashboard();
  }

  // POST ROUTES
  @Public()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    console.log(user);
    return;
  }
}
