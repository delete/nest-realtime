import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { BoardSchema } from './board.entiy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
  ],
  controllers: [],
  providers: [BoardsService, BoardsResolver],
})
export class BoardsModule {}
