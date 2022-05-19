import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {UserInput} from "./user.input";
import {Users} from "./user.entity";
import {LoginInput} from "../user/user.input";
import {Logger} from "@nestjs/common";

@Resolver(() => Users)
export class UserResolver {
  constructor(private readonly userService: UserService,) {}

  @Query(() => [])
  async getUsers() {
    return this.userService.getUserList();
  }

  @Mutation(() => Users)
  async createUser(@Args("users") users: UserInput) {
    return await this.userService.createOneUser(users);

  }

  @Mutation(() => String)
  async loginUser(@Args("user") user: LoginInput) {
    try {
      const { email, password } = user;
      return await this.userService.loginUser(email, password);
    } catch (e) {
      Logger.log(e);
      return false;
    }
  }
}
