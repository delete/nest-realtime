import { Field, ObjectType, Int, ID } from 'type-graphql';
import { Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@ObjectType()
export class Card {
  @Column()
  @Field(type => String)
  _id: string;

  @Column()
  @Field()
  title: string;

  @Column('int')
  @Field(type => Int)
  index: number;

  @Column('text')
  @Field()
  text: string;

  constructor(title: string, text: string, index: number) {
    this._id = this._id || uuid();
    this.title = title;
    this.text = text;
    this.index = index;
  }
}
