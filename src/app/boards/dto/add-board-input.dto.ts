import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class AddBoardToListInput {
  @Field(type => ID)
  listId: string;

  @Field()
  title: string;

  @Field()
  text: string;
}
