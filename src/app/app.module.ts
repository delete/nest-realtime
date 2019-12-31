import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/model/board.model';
import { User } from './boards/model/user.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nest',
      entities: [User, Board],
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    BoardsModule,
  ],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
