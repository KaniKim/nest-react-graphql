import {InputType, Field} from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  readonly email!: string;

  @Field()
  readonly password!: string;

  @Field()
  readonly name!: string;

  @Field()
  readonly phone!: string;
}
