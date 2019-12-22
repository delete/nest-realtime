import { Field, InputType } from 'type-graphql';

import { IBoard } from '../schema/board.schema';

@InputType()
export class NewBoardInput {
  @Field(tyoe => String)
  name: string;

  @Field()
  ownerId: string;
}
