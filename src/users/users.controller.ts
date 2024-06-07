import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // GET ROUTES

  //   @Get()
  //   getUsers() {
  //     return this.usersService.getUsers();
  //   }

  //   @Get(':username')
  //   async getUserByUsername(
  //     @Param('username') username: string,
  //   ): Promise<User | null> {
  //     const findUser = await this.usersService.getUserByUsername(username);
  //     if (!findUser) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     return findUser;
  //   }

  // POST ROUTES

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return user;
  }
}
