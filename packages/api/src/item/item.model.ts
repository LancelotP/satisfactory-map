import { Entity, Column } from "typeorm";
import { Resource } from "../common/common.model";

@Entity()
export class Item extends Resource {
  @Column()
  name: string;
}
