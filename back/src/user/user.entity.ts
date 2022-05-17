import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Users extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
      id?: string;
    @Field(()=>String)
    @Column({ length:20, nullable: false })
      email!: string;
    @Field(()=>String)
    @Column({ length:200, nullable: false })
      password!: string;
    @Field(()=>String)
    @Column({nullable: false})
      name!: string;
    @Field(()=>String)
    @Column({nullable: false})
      phone!: string;
    @Field(()=>String)
    @Column({nullable: false})
      created_at?: Date;
    @Field(()=>String)
    @Column({nullable: false})
      updated_at?: Date;
}
