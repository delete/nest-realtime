import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class BoardNotFound {
  @Field()
  message: string;
}
