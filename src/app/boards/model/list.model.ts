import { Field, ObjectType, Int } from 'type-graphql';
import { Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Card } from './card.model';

@ObjectType()
export class List {
  @Column()
  @Field(type => String)
  _id: string;

  @Column()
  @Field()
  name: string;

  @Column('int')
  @Field(type => Int)
  index: number;

  @Column(type => Card)
  @Field(type => [Card])
  cards: Card[];

  constructor(name: string, index: number) {
    this._id = this._id || uuid();
    this.name = name;
    this.index = index;
    this.cards = [];
  }
}
