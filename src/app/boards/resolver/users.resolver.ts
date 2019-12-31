import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Board } from '../model/board.model';
import { NewUserInput } from '../dto/new-user-input';
import { User } from '../model/user.model';
import { UsersService } from '../service/users.service';

@Resolver(of => Board)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args('newUserInput') newUserinput: NewUserInput) {
    return this.usersService.create(newUserinput);
  }
}
