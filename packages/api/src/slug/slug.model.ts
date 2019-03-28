import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { SlugType } from "../types";
import { Marker } from "../marker/marker.model";
import { Map } from "../map/map.model";
import { User } from "../user/user.model";

@Entity()
export class Slug extends Marker {
  @Column()
  type: SlugType;

  @ManyToOne(type => Map, map => map.deposits, { nullable: false })
  @JoinColumn()
  map: Map;

  @ManyToOne(type => User)
  @JoinColumn()
  creator: User;
}
