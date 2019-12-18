import { Field, InputType } from 'type-graphql';

@InputType()
export class NewBoardInput {
  @Field()
  name: string;

  @Field()
  owner: string;
}
