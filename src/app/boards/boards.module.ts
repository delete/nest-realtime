import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';

import { BoardsResolver } from './resolver/boards.resolver';
import { BoardsService } from './service/boards.service';
import { BoardSchema } from './schema/board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
  ],
  controllers: [],
  providers: [
    BoardsService,
    BoardsResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class BoardsModule {}
