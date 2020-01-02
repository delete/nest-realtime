import { Field, InputType, ID, Int } from 'type-graphql';

@InputType()
export class UpdateBoardInput {
  @Field({ nullable: true })
  name?: string;

  @Field(type => Int, { nullable: true })
  index?: number;

  @Field({ nullable: true })
  deleted?: boolean;
}
