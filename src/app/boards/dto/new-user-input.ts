import { Field, InputType } from 'type-graphql';

@InputType()
export class NewUserInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
