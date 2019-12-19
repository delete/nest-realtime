import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Board } from './entity/board.entity';
import { NewBoardInput } from './dto/new-board-input.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<Board>,
  ) {}

  async create(createBoardDto: NewBoardInput): Promise<Board> {
    const createdBaord = new this.boardModel(createBoardDto);
    const newBoard = await createdBaord.save();
    newBoard.id = newBoard._id;
    return newBoard;
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  async findOneById(id: string): Promise<Board | null> {
    return this.boardModel.findById(id).exec();
  }

  async remove(id: string): Promise<Board | null> {
    const removedBoard = await this.boardModel.findByIdAndRemove(id).exec();

    if (removedBoard) {
      removedBoard.id = removedBoard._id;
    }

    return removedBoard;
  }
}
