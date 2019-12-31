import { Field, ObjectType } from 'type-graphql';
import { Entity, Column, ObjectIdColumn, Index } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Field(type => String)
  @ObjectIdColumn()
  _id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  @Index({ unique: true })
  email: string;
}
