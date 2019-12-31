import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewBoardInput } from '../dto/new-board-input.dto';
import { AddListToBoardInput } from '../dto/add-list-input.dto';
import { AddCardToListInput } from '../dto/add-card-input';
import { BoardsArgs } from '../dto/boards.args';
import { Board } from '../model/board.model';
import { User } from '../model/user.model';
import { List } from '../model/list.model';
import { Card } from '../model/card.model';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBoardDto: NewBoardInput): Promise<Board> {
    const { ownerId } = createBoardDto;
    const boardsCount = await this.count(ownerId);
    const user = await this.userRepository.findOne(ownerId);

    const createdBoard = this.boardRepository.create(createBoardDto);
    createdBoard.index = boardsCount;
    createdBoard.owner = user;
    createdBoard.team = [user];

    return await this.boardRepository.save(createdBoard);
  }

  async findAll(args: BoardsArgs): Promise<Board[]> {
    const { ownerId } = args;

    return this.boardRepository.find({
      where: { 'owner.email': ownerId },
      order: { index: 'ASC' },
    });
  }

  async count(ownerId: string): Promise<number> {
    return this.boardRepository.count({
      where: { owner: { _id: ownerId } },
    });
  }

  async findOneById(id: string): Promise<Board | null> {
    return this.boardRepository.findOne(id);
  }

  async remove(id: string): Promise<Board | null> {
    const board = await this.boardRepository.findOne(id);
    await this.boardRepository.update(board._id, { deleted: true });
    return board;
  }

  // async update(id: string, board: IBoard): Promise<IBoard | null> {
  //   const updated = await this.boardModel
  //     .update({ _id: id }, { $set: { ...board } }, { multi: true, new: true })
  //     .exec();

  //   if (updated) {
  //     updated.id = updated._id;
  //   }

  //   return updated;
  // }

  async addList(addListInput: AddListToBoardInput): Promise<List> {
    const { boardId, name } = addListInput;
    const board = await this.boardRepository.findOne(boardId);

    if (!board) {
      throw new NotFoundException(`Board: ${boardId}`);
    }

    const list = new List(name, board.lists.length);

    board.lists.push(list);

    await this.boardRepository.update({ _id: board._id }, board);

    return list;
  }

  async addCard(addCardInput: AddCardToListInput): Promise<Card> {
    const { boardId, listId, title, text } = addCardInput;
    const board = await this.boardRepository.findOne(boardId);

    if (!board) {
      throw new NotFoundException(`Board: ${boardId}`);
    }

    const list = board.lists.find(l => l._id === listId);

    if (!list) {
      throw new NotFoundException(`List: ${listId}`);
    }

    const card = new Card(title, text, list.cards.length);

    list.cards.push(card);

    await this.boardRepository.update({ _id: board._id }, board);

    return card;
  }
}
