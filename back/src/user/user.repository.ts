import { EntityRepository, Repository } from "typeorm";
import { Users } from "./user.entity";
import {UserInput} from "./user.input";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}

