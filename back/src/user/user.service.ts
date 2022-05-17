import {Injectable, Logger} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./user.entity";
import {UserDto} from "./user.dto";
import {UserInput} from "./user.input";
import { v4 as uuid } from "uuid";
import {IsDate} from "class-validator";

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private readonly userRepository: UserRepository) {}

  async createOneUser(createUserDto: UserInput) {
    try {
      await this.userRepository.createQueryBuilder()
        .insert()
        .into(Users)
        .values({
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
          phone: createUserDto.phone,
          updated_at: new Date(),
          created_at: new Date()
        })
        .execute();
      return createUserDto;
    } catch (e) {
      Logger.log(e);
    }

  }

  getUserList() {
    return this.userRepository.find();
  }

  getDetailUser(id: number) {
    return this.userRepository.findOne(id);
  }

  updateUser(id: number, updateUserDto: UserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  removeOneUser(id: number) {
    return this.userRepository.delete(id);
  }
}
