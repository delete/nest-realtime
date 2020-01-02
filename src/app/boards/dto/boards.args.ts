import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetBoardsArgs {
  @Field()
  ownerId: string;
}
