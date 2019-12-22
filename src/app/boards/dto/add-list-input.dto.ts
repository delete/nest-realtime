import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class AddListToBoardInput {
  @Field(type => ID)
  boardId: string;

  @Field()
  name: string;
}
