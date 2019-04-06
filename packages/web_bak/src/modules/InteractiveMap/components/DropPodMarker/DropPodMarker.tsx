import React from "react";
import * as L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { DropPodMarkerFragment } from "../../../../__generated__";

type Props = {
  marker: DropPodMarkerFragment;
  iconSize: number;
};

export const DropPodIcon = (props: Props) => {
  const { marker, iconSize } = props;

  return L.divIcon({
    html: renderToStaticMarkup(<DropPodIconSvg color="deeppink" />),
    iconSize: [iconSize, iconSize]
  });
};

type MarkerProps = {
  color: string;
};

const DropPodIconSvg = ({ color }: MarkerProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="1"
      y="1"
      width="38"
      height="38"
      rx="8"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);
