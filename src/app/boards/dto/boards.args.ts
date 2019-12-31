import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class BoardsArgs {
  @Field()
  ownerId: string;
}
