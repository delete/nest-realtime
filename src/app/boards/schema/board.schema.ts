import * as mongoose from 'mongoose';
import { ListSchema, IList } from './list.schema';
import { IUser } from './user.schema';

export interface IBoard extends mongoose.Document {
  id?: string;
  name: string;
  index: number;
  owner: IUser;
  team: IUser[];
  lists: IList[];
}

export const BoardSchema: mongoose.Schema<IBoard> = new mongoose.Schema({
  name: String,
  index: Number,
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  team: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  lists: [ListSchema],
});
