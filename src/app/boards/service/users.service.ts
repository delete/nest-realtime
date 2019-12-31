import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewUserInput } from '../dto/new-user-input';
import { User } from '../model/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: NewUserInput): Promise<User> {
    const createdUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
