import * as mongoose from 'mongoose';
import { ListSchema, IList } from './list.schema';

export interface IBoard extends mongoose.Document {
  id?: string;
  name: string;
  owner: string;
  lists: IList[];
}

export const BoardSchema: mongoose.Schema<IBoard> = new mongoose.Schema({
  name: String,
  owner: String,
  lists: [ListSchema],
});
