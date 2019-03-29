import { DepositType } from "../__generated__";

export function getDepositColor(type: DepositType) {
  switch (type) {
    case DepositType.Bauxite:
      return "#D973A9";
    case DepositType.Caterium:
      return "#F1D448";
    case DepositType.Coal:
      return "#333333";
    case DepositType.Copper:
      return "#20B6EE";
    case DepositType.Iron:
      return "#E65500";
    case DepositType.Limestone:
      return "#9F8B71";
    case DepositType.Oil:
      return "#333333";
    case DepositType.Quartz:
      return "#00FFB0";
    case DepositType.Sam:
      return "#0073B7";
    case DepositType.Sulphur:
      return "#FDAC00";
    case DepositType.Uranium:
      return "#00E337";
    case DepositType.Geyser:
      return "#ff0000";
  }
}
