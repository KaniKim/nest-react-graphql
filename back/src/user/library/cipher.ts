import * as bcrypt from "bcrypt";
import {ConfigService} from "@nestjs/config";

export const hash = async (plainText: string): Promise<string> => {
  const conf = new ConfigService();
  const salt: string = conf.get<string>("SALT");
  return await bcrypt.hash(plainText+salt, 10);
};

export const isHashValid = async (password, hashedPassword): Promise<boolean> => {
  const conf = new ConfigService();
  const salt: string = conf.get<string>("SALT");
  return await bcrypt.compare(password+salt, hashedPassword);
};
