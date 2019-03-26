import { Entity, OneToMany } from "typeorm";
import { Resource } from "../common/common.model";
import { Deposit } from "../deposit/deposit.model";

@Entity()
export class Map extends Resource {
  @OneToMany(type => Deposit, deposit => deposit.map)
  deposits: Deposit[];
}
