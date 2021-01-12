import { Field, ObjectType, Root } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@ObjectType()
@Entity({
  name: "USERS",
})
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  full_name(@Root() { first_name, last_name }: User): string {
    return `${first_name} ${last_name}`;
  }

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column()
  password: string;
}
