import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Board {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  owner: string;
}
