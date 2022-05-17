import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {UserInput} from "./user.input";
import {Users} from "./user.entity";
import {Logger} from "@nestjs/common";
import {UserDto} from "./user.dto";

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
    
}
