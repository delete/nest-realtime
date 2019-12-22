import * as mongoose from 'mongoose';
import { CardSchema, ICard } from './card.schema';

export interface IList extends mongoose.Document {
  id?: string;
  name: string;
  cards: ICard[];
}

export const ListSchema: mongoose.Schema<IList> = new mongoose.Schema({
  name: String,
  cards: [CardSchema],
});
