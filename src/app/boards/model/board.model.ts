import { Field, ObjectType, Int } from 'type-graphql';
import {
  Entity,
  Column,
  ObjectIdColumn,
  BeforeInsert,
  ObjectID,
} from 'typeorm';

import { List } from './list.model';
import { User } from './user.model';

@Entity()
@ObjectType()
export class Board {
  @Field(type => String)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field(type => Int)
  @Column('int')
  index: number;

  @Field(type => User)
  @Column(type => User)
  owner: User;

  @Field(type => [User])
  @Column(type => User)
  team: User[];

  @Field(type => [List])
  @Column(type => List)
  lists: List[];

  @Field()
  @Column()
  deleted: boolean;

  @BeforeInsert()
  initValues() {
    this.lists = [];
  }
}
