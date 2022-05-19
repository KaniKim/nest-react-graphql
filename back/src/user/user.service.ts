import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "./user.entity";
import {UserInput} from "./user.input";
import {hash, isHashValid} from "./library/cipher";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
        @InjectRepository(Users)
        private readonly userRepository: UserRepository,
        private jwtService: JwtService
  ) {
  }

  async createOneUser(createUserDto: UserInput) {
    const {name, email, password, phone} = createUserDto ;
    const created_at = new Date();
    const updated_at = new Date();
    const hashed_password = await hash(password);
    const id = (await this.userRepository.createQueryBuilder()
      .insert()
      .into(Users)
      .values({
        name: name,
        email: email,
        password: hashed_password,
        phone: phone,
        updated_at: updated_at,
        created_at: created_at
      })
      .execute()).raw[0].id;

    return {
      id: id,
      name: name,
      email: email,
      phone: phone,
      created_at: created_at,
      updated_at: updated_at
    };
    
  }

  async loginUser(email: string, password: string) {

    const user = (await this.userRepository.query(
      `SELECT email, password
               FROM users
               WHERE email='${email}'`
    ))[0];
    if(user === undefined) {
      throw new Error("There is no user to find");
    }
    if (user.email === email && await isHashValid(password, user.password)) {
      const payload = {username: user.email};
      return this.jwtService.sign(payload);
    }

  }

  getUserList() {
    return this.userRepository.find();
  }
}
