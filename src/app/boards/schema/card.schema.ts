import * as mongoose from 'mongoose';

export interface ICard extends mongoose.Document {
  id?: string;
  title: string;
  index: number;
  text: string;
}

export const CardSchema: mongoose.Schema<ICard> = new mongoose.Schema({
  title: String,
  index: Number,
  text: String,
});
