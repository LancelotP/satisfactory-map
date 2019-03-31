import { ResourceNodeType } from "../__generated__";

export function getDepositColor(type: ResourceNodeType) {
  switch (type) {
    case ResourceNodeType.Bauxite:
      return "#D973A9";
    case ResourceNodeType.Caterium:
      return "#F1D448";
    case ResourceNodeType.Coal:
      return "#333333";
    case ResourceNodeType.Copper:
      return "#20B6EE";
    case ResourceNodeType.Iron:
      return "#E65500";
    case ResourceNodeType.Limestone:
      return "#9F8B71";
    case ResourceNodeType.Oil:
      return "#333333";
    case ResourceNodeType.Quartz:
      return "#00FFB0";
    case ResourceNodeType.Sam:
      return "#0073B7";
    case ResourceNodeType.Sulfur:
      return "#FDAC00";
    case ResourceNodeType.Uranium:
      return "#00E337";
    default:
      return "#ff0000";
  }
}
