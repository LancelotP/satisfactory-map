export type Marker = {
  x: number;
  y: number;
  z: number;
  obstructed: boolean;
};

export type NodeType =
  | "iron"
  | "copper"
  | "limestone"
  | "coal"
  | "oil"
  | "caterium"
  | "sulfur"
  | "bauxite"
  | "quartz"
  | "uranium"
  | "sam"
  | "geyser";
export type NodePurity = "impure" | "normal" | "pure";

export type Node = Marker & {
  purity: NodePurity;
  type: NodeType;
  originId: string;
};

export type Geyser = Marker & {
  type: "geyser";
  originId: string;
};

export type SlugType = "green" | "yellow" | "purple";

export type Slug = Marker & {
  type: SlugType;
  originId: string;
};

export type ArtifactType = "somer" | "mercer";

export type Artifact = Marker & {
  type: ArtifactType;
  originId: string;
};

export type DropPod = Marker & {
  originId;
  type: "droppod";
  itemQuantity?: number;
  itemName?: string;
  powerNeeded?: number;
};
