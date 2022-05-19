import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { Users } from "./user/user.entity";
import { GraphQLModule } from "@nestjs/graphql";
import {ApolloDriver} from "@nestjs/apollo";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().integer().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      })
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.DB_HOST,
      "port": +process.env.DB_PORT,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "extra": {
        "ssl": false
      },
      "entities": [Users],
    }),
    UserModule,
  ],

})
export class AppModule {}
