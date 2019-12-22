import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  id?: string;
  name: string;
  email: string;
}

export const UserSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  name: String,
  email: String,
});
