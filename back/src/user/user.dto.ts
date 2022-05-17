import {Field, ObjectType} from "@nestjs/graphql";
import {IsString, IsDate} from "class-validator";

@ObjectType()
export class UserDto {
  @Field({nullable: false})
  @IsString()
  readonly id?: string;
  @Field({nullable: false})
  @IsString()
  readonly email!: string;
  @Field({nullable: true})
  @IsString()
  readonly  password!: string;
  @Field({nullable: false})
  @IsString()
  readonly  name!: string;
  @Field({nullable: false})
  @IsString()
  readonly  phone!: string;
  @Field({nullable: true})
  @IsDate()
  readonly  created_at?: Date;
  @Field({nullable: true})
  @IsDate()
  readonly  updated_at?: Date;
}
