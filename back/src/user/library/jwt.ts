import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {isHashValid} from "./cipher";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(conf: ConfigService ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:conf.get<string>("JWT_SECRET"),
    });
  }

  async validate(payload: any, hashed_password: string): Promise<boolean>{
    return isHashValid(payload.password, hashed_password);
  }
}
