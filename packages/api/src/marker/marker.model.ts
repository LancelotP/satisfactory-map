import { Resource } from "../common/common.model";
import { Column } from "typeorm";

export class Marker extends Resource {
  @Column({ type: "double precision" })
  lat: number;

  @Column({ type: "double precision" })
  lng: number;
}
