import { Field, InputType, ID } from 'type-graphql';

import { Board } from '../model/board.model';

@InputType()
export class UpdateBoardInput {
  @Field(tyoe => ID)
  id: string;

  @Field(type => Board)
  board: Board;
}
