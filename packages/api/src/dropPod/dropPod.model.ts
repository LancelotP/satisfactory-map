import { Entity, Column } from "typeorm";
import { Resource } from "../common/common.model";
// import { ItemYield } from "../itemYield/itemYield.model";

@Entity()
export class DropPod extends Resource {
  // @Column({ type: "text" })
  // type: "PURPLE" | "YELLOW" | "GREEN";

  @Column()
  originId: string;

  @Column({ nullable: true })
  itemName?: string;

  @Column({ nullable: true })
  itemQuantity?: number;

  @Column({ nullable: true })
  powerNeeded?: number;

  // @OneToOne(type => ItemYield)
  // @JoinColumn()
  // yield: ItemYield;
}
