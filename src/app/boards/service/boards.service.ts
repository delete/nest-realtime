import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewBoardInput } from '../dto/new-board-input.dto';
import { AddListToBoardInput } from '../dto/add-list-input.dto';
import { AddCardToListInput } from '../dto/add-card-input';
import { UpdateBoardInput } from '../dto/update-board-input';
import { GetBoardsArgs } from '../dto/boards.args';
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
    const user = await this.userRepository.findOne(ownerId);

    const createdBoard = this.boardRepository.create(createBoardDto);
    createdBoard.index = await this.count(user.email);
    createdBoard.owner = user;
    createdBoard.team = [user];

    return await this.boardRepository.save(createdBoard);
  }

  async findAll({ ownerId }: GetBoardsArgs): Promise<Board[]> {
    return this.boardRepository.find({
      where: { 'owner.email': ownerId },
      order: { index: 'ASC' },
      cache: true,
    });
  }

  async count(ownerEmail: string): Promise<number> {
    // TODO: repository.count is not working
    const [, counter] = await this.boardRepository.findAndCount({
      where: { 'owner.email': ownerEmail },
    });
    return counter;
  }

  async findOneById(id: string): Promise<Board | null> {
    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw new NotFoundException(`Board: ${id}`);
    }

    return board;
  }

  async softRemove(id: string): Promise<boolean> {
    return this.update(id, { deleted: true });
  }

  async update(id: string, input: UpdateBoardInput): Promise<boolean> {
    const board = await this.findOneById(id);
    const a = await this.boardRepository.update(
      { _id: board._id },
      Object.assign(board, input),
    );
    return true;
  }

  async addList(addListInput: AddListToBoardInput): Promise<List> {
    const { boardId, name } = addListInput;
    const board = await this.findOneById(boardId);
    const list = new List(name, board.lists.length);

    board.lists.push(list);

    await this.boardRepository.update({ _id: board._id }, board);

    return list;
  }

  async addCard(addCardInput: AddCardToListInput): Promise<Card> {
    const { boardId, listId, title, text } = addCardInput;
    const board = await this.findOneById(boardId);
    const list = this.findListById(listId, board);
    const card = new Card(title, text, list.cards.length);

    list.cards.push(card);

    await this.boardRepository.update({ _id: board._id }, board);

    return card;
  }

  findListById(id: string, board: Board): List {
    const list = board.lists.find(l => l._id === id);

    if (!list) {
      throw new NotFoundException(`List: ${id}`);
    }

    return list;
  }
}
