import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class AddCardToListInput {
  @Field(type => ID)
  boardId: string;

  @Field(type => ID)
  listId: string;

  @Field()
  title: string;

  @Field()
  text: string;
}
