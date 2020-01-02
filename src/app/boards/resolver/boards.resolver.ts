import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Board } from '../model/board.model';
import { NewBoardInput } from '../dto/new-board-input.dto';
import { BoardsService } from '../service/boards.service';
import { AddListToBoardInput } from '../dto/add-list-input.dto';
import { AddCardToListInput } from '../dto/add-card-input';
import { UpdateBoardInput } from '../dto/update-board-input';
import { GetBoardsArgs } from '../dto/boards.args';
import { Card } from '../model/card.model';
import { List } from '../model/list.model';

enum BoardEvents {
  BOARD_CREATED = 'boardCreated',
  BOARD_REMOVED = 'boardRemoved',
  BOARD_CHANGED = 'boardChanged',
}

@Resolver(Board)
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService,
    @Inject('PUB_SUB') private readonly pubsub: PubSub,
  ) {}

  @Query(() => Board)
  async board(@Args('id') id: string) {
    return await this.boardsService.findOneById(id);
  }

  @Query(() => [Board])
  async boards(@Args() args: GetBoardsArgs) {
    return this.boardsService.findAll(args);
  }

  @Mutation(() => Board)
  async createBoard(@Args('input') input: NewBoardInput) {
    const newBoard = await this.boardsService.create(input);

    this.publish(BoardEvents.BOARD_CREATED, newBoard);

    return newBoard;
  }

  @Mutation(() => Boolean)
  async removeBoard(@Args('id') id: string) {
    return await this.boardsService.softRemove(id);
  }

  @Mutation(returns => Boolean)
  async updateBoard(
    @Args('id') id: string,
    @Args('input') input: UpdateBoardInput,
  ) {
    return await this.boardsService.update(id, input);
  }

  @Mutation(() => List)
  async addList(@Args('input') input: AddListToBoardInput) {
    return await this.boardsService.addList(input);
  }

  @Mutation(() => Card)
  async addCard(@Args('input') input: AddCardToListInput) {
    return await this.boardsService.addCard(input);
  }

  @Subscription(() => Board)
  async boardCreated() {
    return this.pubsub.asyncIterator(BoardEvents.BOARD_CREATED);
  }

  private publish(event: BoardEvents, data: any) {
    this.pubsub.publish(event, { [event]: data });
  }
}
