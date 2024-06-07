import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    const newSalt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(newUser.password, newSalt);
    newUser.salt = newSalt;
    newUser.password = newPass;
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    return user;
  }
}
