import { SlugType } from "../__generated__";

export function getSlugColor(slugType: SlugType) {
  switch (slugType) {
    case SlugType.Green:
      return "#08D1D8";
    case SlugType.Yellow:
      return "#F9F903";
    case SlugType.Purple:
      return "#D100ED";
    default:
      return "red";
  }
}
