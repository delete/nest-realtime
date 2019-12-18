import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema({
  name: String,
  owner: String,
});

export interface Board {
  id: string;
  name: string;
  owner: string;
}
