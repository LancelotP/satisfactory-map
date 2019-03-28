import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Marker } from "../marker/marker.model";
import { Map } from "../map/map.model";
import { User } from "../user/user.model";

@Entity()
export class DropPod extends Marker {
  @ManyToOne(type => Map, map => map.deposits, { nullable: false })
  @JoinColumn()
  map: Map;

  @ManyToOne(type => User)
  @JoinColumn()
  creator: User;
}
