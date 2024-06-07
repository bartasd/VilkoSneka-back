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

  async signIn(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.getUserByUsername(
      createUserDto.username,
    );
    if (user) {
      const testPass = await bcrypt.hash(createUserDto.password, user.salt);
      if (user.password === testPass) {
        const { password, ...result } = user;
        const payload = { username: user.username, password: user.password };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
