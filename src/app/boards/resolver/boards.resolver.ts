import { NotFoundException, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Board } from '../model/board.model';
import { NewBoardInput } from '../dto/new-board-input.dto';
import { BoardsService } from '../service/boards.service';
import { AddListToBoardInput } from '../dto/add-list-input.dto';
import { AddCardToListInput } from '../dto/add-card-input';
// import { UpdateBoardInput } from '../dto/update-board-input';
import { BoardsArgs } from '../dto/boards.args';
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

  @Query(returns => Board)
  async board(@Args('id') id: string) {
    const board = await this.boardsService.findOneById(id);

    if (!board) {
      throw new NotFoundException(id);
    }
    return board;
  }

  @Query(returns => [Board])
  async boards(@Args() boardsArgs: BoardsArgs) {
    return this.boardsService.findAll(boardsArgs);
  }

  @Mutation(returns => Board)
  async createBoard(@Args('newBoardInput') newBoardinput: NewBoardInput) {
    const newBoard = await this.boardsService.create(newBoardinput);

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

  // @Mutation(returns => Board)
  // async updateBoard(
  //   @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  // ) {
  //   const { id, board } = updateBoardInput;
  //   const updatedBoard = await this.boardsService.update(id, {
  //     ...board,
  //   } as IBoard);

  //   this.pubsub.publish(BoardEvents.BOARD_CHANGED, {
  //     [BoardEvents.BOARD_CHANGED]: updatedBoard,
  //   });

  //   return !!updatedBoard;
  // }

  @Mutation(returns => List)
  async addList(
    @Args('addListToBoardInput') addListToBoardInput: AddListToBoardInput,
  ) {
    const list = await this.boardsService.addList(addListToBoardInput);

    // this.pubsub.publish(BoardEvents.BOARD_CHANGED, {
    //   [BoardEvents.BOARD_CHANGED]: board,
    // });

    return list;
  }

  @Mutation(returns => Card)
  async addCard(
    @Args('addCardToListInput') addCardToListInput: AddCardToListInput,
  ) {
    const card = await this.boardsService.addCard(addCardToListInput);

    // this.pubsub.publish(BoardEvents.BOARD_CHANGED, {
    //   [BoardEvents.BOARD_CHANGED]: board,
    // });

    return card;
  }

  // @Subscription(returns => Board)
  // async boardCreated() {
  //   return this.pubsub.asyncIterator(BoardEvents.BOARD_CREATED);
  // }

  // @Subscription(returns => Board)
  // async boardRemoved() {
  //   return this.pubsub.asyncIterator(BoardEvents.BOARD_REMOVED);
  // }
}
