import { Field, ID, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class Card {
  @Field(type => ID)
  id?: string;

  @Field()
  title: string;

  @Field(type => Int)
  index: number;

  @Field()
  text: string;
}
