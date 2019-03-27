import { Marker } from "../marker/marker.model";
import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { DepositQuality, DepositType } from "../types";
import { Map } from "../map/map.model";
import { User } from "../user/user.model";

@Entity()
export class Deposit extends Marker {
  @Column()
  quality: DepositQuality;

  @Column()
  type: DepositType;

  @ManyToOne(type => Map, map => map.deposits, { nullable: false })
  @JoinColumn()
  map: Map;

  @ManyToOne(type => User)
  @JoinColumn()
  creator: User;
}
