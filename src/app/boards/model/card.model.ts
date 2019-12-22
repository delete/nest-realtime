import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Card {
  @Field(type => ID)
  id?: string;

  @Field()
  title: string;

  @Field()
  text: string;
}
