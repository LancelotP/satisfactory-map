import { Resource } from "../common/common.model";
import { Entity, Column } from "typeorm";

@Entity()
export class User extends Resource {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ unique: true })
  sub: string;

  @Column({ nullable: true })
  userName: string;
}
