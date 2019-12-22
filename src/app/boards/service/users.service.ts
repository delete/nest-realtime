import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUser } from '../schema/user.schema';
import { NewUserInput } from '../dto/new-user-input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: NewUserInput): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    const newUser = await createdUser.save();

    newUser.id = newUser._id;
    return newUser;
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}
