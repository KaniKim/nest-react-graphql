import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "./user.entity";
import {UserService} from "./user.service";
import {UserResolver} from "./user.resolver";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./library/jwt";

@Module({
  providers: [UserService, UserResolver, JwtStrategy],
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({defaultStrategy: "jwt", session: false}),
    JwtModule.register({
      secret: new ConfigService().get<string>("JWT_SECRET"),
      signOptions: { expiresIn: "1 day"},
    }),
  ],
})
export class UserModule {}
