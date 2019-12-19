import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';

import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { BoardSchema } from './entity/board.entity';

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
