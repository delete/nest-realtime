import * as mongoose from 'mongoose';

export interface ICard extends mongoose.Document {
  id?: string;
  title: string;
  text: string;
}

export const CardSchema: mongoose.Schema<ICard> = new mongoose.Schema({
  title: String,
  text: String,
});
