import { Entity, Column } from "typeorm";
import { Resource } from "../common/common.model";
// import { ItemYield } from "../itemYield/itemYield.model";

@Entity()
export class ResourceNode extends Resource {
  @Column({ type: "text", enum: ["IMPURE", "NORMAL", "PURE", "UNKNOWN"] })
  quality: "IMPURE" | "NORMAL" | "PURE" | "UNKNOWN";

  @Column({ type: "text" })
  type:
    | "IRON"
    | "COPPER"
    | "LIMESTONE"
    | "BAUXITE"
    | "URANIUM"
    | "COAL"
    | "OIL"
    | "SULFUR"
    | "QUARTZ"
    | "SAM"
    | "CATERIUM"
    | "UNKNOWN";

  @Column()
  originId: string;

  // @OneToOne(type => ItemYield)
  // @JoinColumn()
  // yield: ItemYield;
}
