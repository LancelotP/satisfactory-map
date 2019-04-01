import React from "react";
import * as L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  RnMarkerFragment,
  ResourceNodeQuality
} from "../../../../__generated__";
import { getDepositColor } from "../../../../utils/getDepositColor";

type Props = {
  marker: RnMarkerFragment;
  iconSize: number;
};

export const RNMarkerIcon = (props: Props) => {
  const { marker, iconSize } = props;

  const color = getDepositColor(marker.type);
  let icon: string;

  if (marker.quality === ResourceNodeQuality.Impure) {
    icon = renderToStaticMarkup(<RNMarkerImpure color={color} />);
  } else if (marker.quality === ResourceNodeQuality.Normal) {
    icon = renderToStaticMarkup(<RNMarkerNormal color={color} />);
  } else if (marker.quality === ResourceNodeQuality.Pure) {
    icon = renderToStaticMarkup(<RNMarkerPure color={color} />);
  } else {
    icon = renderToStaticMarkup(<RNMarkerUnknown color={color} />);
  }

  return L.divIcon({
    html: icon,
    iconSize: [iconSize, iconSize]
  });
};

type MarkerProps = {
  color: string;
};

const RNMarkerImpure = ({ color }: MarkerProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2.24L1.62 39h36.76L20 2.24z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const RNMarkerNormal = ({ color }: MarkerProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.6 20L20 1.6 38.4 20 20 38.4z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const RNMarkerPure = ({ color }: MarkerProps) => (
  <svg viewBox="0 0 38 37" version="1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const RNMarkerUnknown = ({ color }: MarkerProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="nonzero" fill="none">
      <circle fill={color} cx="20" cy="20" r="19" />
      <path
        d="M20 2a18 18 0 1 1 0 36 18 18 0 0 1 0-36zm0-2a20 20 0 1 0 0 40 20 20 0 0 0 0-40z"
        fill="#FFF"
      />
    </g>
  </svg>
);
