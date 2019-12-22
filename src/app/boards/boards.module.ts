import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';

import { BoardsResolver } from './resolver/boards.resolver';
import { BoardsService } from './service/boards.service';
import { BoardSchema } from './schema/board.schema';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './service/users.service';
import { UsersResolver } from './resolver/users.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Board', schema: BoardSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
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
