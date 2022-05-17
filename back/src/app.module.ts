import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { Users } from "./user/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import {ApolloDriver} from "@nestjs/apollo";

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
    }),
    BoardsModule,
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "127.0.0.1",
      "port": 5432,
      "username": "kanikim",
      "password": "123456",
      "database": "nest",
      "extra": {
        "ssl": false
      },
      "entities": [Users],
    }),
    UserModule
  ],

})
export class AppModule {}
