import { Field, ID, ObjectType } from 'type-graphql';

import { Card } from './card.model';

@ObjectType()
export class List {
  @Field(type => ID)
  id?: string;

  @Field()
  name: string;

  @Field(type => Card)
  cards: Card[];
}
