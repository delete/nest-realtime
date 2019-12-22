import { Field, ID, ObjectType } from 'type-graphql';

import { List } from './list.model';

@ObjectType()
export class Board {
  @Field(type => ID)
  id?: string;

  @Field()
  name: string;

  @Field()
  owner: string;

  @Field(type => List)
  lists: List[];
}
