import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.usersService.getUserByUsername(
      createUserDto.username,
    );
    if (!user) return false;
    const testPass = await bcrypt.hash(createUserDto.password, user.salt);
    return user.password === testPass;
  }

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    const isValidUser = await this.validateUser(createUserDto);
    if (isValidUser) {
      const payload = { username: createUserDto.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
