import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
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
