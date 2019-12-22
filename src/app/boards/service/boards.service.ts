import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IBoard } from '../schema/board.schema';
import { ICard } from '../schema/card.schema';
import { IList } from '../schema/list.schema';
import { NewBoardInput } from '../dto/new-board-input.dto';
import { AddListToBoardInput } from '../dto/add-list-input.dto';
import { AddCardToListInput } from '../dto/add-card-input';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel('Board') private readonly boardModel: Model<IBoard>,
  ) {}

  async create(createBoardDto: NewBoardInput): Promise<IBoard> {
    const createdBaord = new this.boardModel(createBoardDto);
    const newBoard = await createdBaord.save();
    newBoard.id = newBoard._id;
    return newBoard;
  }

  async findAll(): Promise<IBoard[]> {
    return this.boardModel.find().exec();
  }

  async findOneById(id: string): Promise<IBoard | null> {
    return this.boardModel.findById(id).exec();
  }

  async remove(id: string): Promise<IBoard | null> {
    const removedBoard = await this.boardModel.findByIdAndRemove(id).exec();

    if (removedBoard) {
      removedBoard.id = removedBoard._id;
    }

    return removedBoard;
  }

  async addList(addListInput: AddListToBoardInput): Promise<IBoard> {
    const { boardId, name } = addListInput;
    const board = await this.boardModel.findById(boardId);

    board.lists.push({ name } as IList);

    return await board.save();
  }

  async addCard(addCardInput: AddCardToListInput): Promise<IBoard> {
    const { boardId, listId, title, text } = addCardInput;
    const board = await this.boardModel.findById(boardId);

    const list = board.lists.find(l => l.id === listId);

    list.cards.push({ title, text } as ICard);

    return await board.save();
  }
}
