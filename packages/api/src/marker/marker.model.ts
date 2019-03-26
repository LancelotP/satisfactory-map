import { Resource } from "../common/common.model";
import { Column } from "typeorm";

export class Marker extends Resource {
  @Column()
  lat: number;

  @Column()
  lng: number;
}
