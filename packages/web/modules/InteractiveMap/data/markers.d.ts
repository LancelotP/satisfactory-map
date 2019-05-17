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
  | "geyser"
  | "unknown";
export type NodePurity = "impure" | "normal" | "pure" | "unknown";

export type Node = Marker & {
  purity: NodePurity;
  type: NodeType;
  originId: string;
  exploited: boolean;
};

export type Geyser = Marker & {
  type: "geyser";
  originId: string;
};

export type SlugType = "green" | "yellow" | "purple";

export type Slug = Marker & {
  type: SlugType;
  collected: boolean;
  originId: string;
};

export type ArtifactType = "somer" | "mercer";

export type Artifact = Marker & {
  type: ArtifactType;
  originId: string;
};

export type DropPod = Marker & {
  originId: string;
  type: "droppod";
  itemQuantity?: number;
  itemName?: string;
  powerNeeded?: number;
  collected: boolean;
};
