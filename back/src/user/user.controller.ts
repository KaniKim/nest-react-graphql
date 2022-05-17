import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto) {
    const result = await this.userService.createOneUser(createUserDto);
    return result;
  }

  @Get()
  async getList() {
    const result = await this.userService.getUserList();
    return result;
  }

  @Get(":id")
  async getOne(@Param("id") userId: number) {
    const result = await this.userService.getDetailUser(userId);
    return result;
  }

  @Put(":id")
  async setOne(@Param("id") userId: number, @Body() updateUserDto: UserDto) {
    const result = await this.userService.updateUser(userId, updateUserDto);
    return result;
  }

  @Delete(":id")
  async removeOne(@Param("id") userId: number) {
    const ret = await this.userService.removeOneUser(userId);
    return ret;
  }

}
