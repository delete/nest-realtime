import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { NewBoardInput } from './create-board.dto';

@Resolver(of => Board)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

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
    const board = await this.boardsService.create(newBoardData);
    return board;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    return this.boardsService.remove(id);
  }
}
