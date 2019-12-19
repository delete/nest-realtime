import { NotFoundException, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Board } from './model/board.model';
import { NewBoardInput } from './dto/new-board-input.dto';
import { BoardsService } from './boards.service';

enum BoardEvents {
  BOARD_CREATED = 'boardCreated',
  BOARD_REMOVED = 'boardRemoved',
}

@Resolver(of => Board)
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
  ) {}

  @Query(returns => Board)
  async board(@Args('id') id: string): Promise<Board> {
    const board = await this.boardsService.findOneById(id);

    if (!board) {
      throw new NotFoundException(id);
    }
    return board;
  }

  @Query(returns => [Board])
  async boards(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Mutation(returns => Board)
  async createBoard(
    @Args('newBoardInput') newBoardData: NewBoardInput,
  ): Promise<Board> {
    const newBoard = await this.boardsService.create(newBoardData);

    this.pubsub.publish(BoardEvents.BOARD_CREATED, {
      [BoardEvents.BOARD_CREATED]: newBoard,
    });

    return newBoard;
  }

  @Mutation(returns => Boolean)
  async removeBoard(@Args('id') id: string) {
    const removedBoard = await this.boardsService.remove(id);

    this.pubsub.publish(BoardEvents.BOARD_REMOVED, {
      [BoardEvents.BOARD_REMOVED]: removedBoard,
    });

    return !!removedBoard;
  }

  @Subscription(returns => Board)
  async boardCreated() {
    return this.pubsub.asyncIterator(BoardEvents.BOARD_CREATED);
  }

  @Subscription(returns => Board)
  async boardRemoved() {
    return this.pubsub.asyncIterator(BoardEvents.BOARD_REMOVED);
  }
}
