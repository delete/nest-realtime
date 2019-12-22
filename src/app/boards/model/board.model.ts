import { Field, ID, ObjectType, Int } from 'type-graphql';

import { List } from './list.model';
import { User } from './user.mode';

@ObjectType()
export class Board {
  @Field(type => ID)
  id?: string;

  @Field()
  name: string;

  @Field(type => Int)
  index: number;

  @Field(type => User)
  owner: User;

  @Field(type => [User])
  team: User[];

  @Field(type => [List])
  lists: List[];
}
