import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PubSub } from 'graphql-subscriptions';

import { BoardsService } from './service/boards.service';
import { UsersService } from './service/users.service';
import { BoardsResolver } from './resolver/boards.resolver';
import { UsersResolver } from './resolver/users.resolver';
import { Board } from './model/board.model';
import { User } from './model/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  controllers: [],
  providers: [
    BoardsService,
    BoardsResolver,
    UsersService,
    UsersResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class BoardsModule {}
