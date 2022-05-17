import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./user.entity";
import {UserService} from "./user.service";
import {UserResolver} from "./user.resolver";

@Module({
  providers: [UserService, UserResolver],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([Users])],
})
export class UserModule {}
