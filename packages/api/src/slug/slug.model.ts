import { Entity, Column } from "typeorm";
import { Resource } from "../common/common.model";
// import { ItemYield } from "../itemYield/itemYield.model";

@Entity()
export class Slug extends Resource {
  @Column({ type: "text" })
  type: "PURPLE" | "YELLOW" | "GREEN";

  @Column()
  originId: string;

  // @OneToOne(type => ItemYield)
  // @JoinColumn()
  // yield: ItemYield;
}
