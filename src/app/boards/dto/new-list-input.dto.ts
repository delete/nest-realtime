import { Field, InputType } from 'type-graphql';

@InputType()
export class NewListInput {
  @Field()
  name: string;
}
