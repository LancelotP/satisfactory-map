import React from "react";
import * as L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import {
  RnMarkerFragment,
  ResourceNodeQuality
} from "../../../../__generated__";
import { getDepositColor } from "../../../../utils/getDepositColor";
import * as S from "./RNMarker.style";

type Props = {
  marker: RnMarkerFragment & { obstructed: boolean };
  iconSize: number;
};

export const RNMarkerIcon = (props: Props) => {
  const { marker, iconSize } = props;

  const color = getDepositColor(marker.type);
  let icon: JSX.Element;
  let fontSize = iconSize / 2;
  let top = iconSize / 10;

  if (marker.quality === ResourceNodeQuality.Impure) {
    icon = <RNMarkerImpure color={color} />;
    top += iconSize / 5;
  } else if (marker.quality === ResourceNodeQuality.Normal) {
    icon = <RNMarkerNormal color={color} />;
  } else if (marker.quality === ResourceNodeQuality.Pure) {
    top += iconSize / 20;
    icon = <RNMarkerPure color={color} />;
  } else {
    icon = <RNMarkerUnknown color={color} />;
  }

  return L.divIcon({
    html: renderToStaticMarkup(
      <S.Root>
        {icon}
        <S.Letter style={{ fontSize, top }}>{marker.type[0]}</S.Letter>
        {marker.obstructed && (
          <S.Obstruction
            xmlns="http://www.w3.org/2000/svg"
            version="1"
            viewBox="0 0 1000 1000"
          >
            <path d="M633 500l329 329c37 37 37 95 0 133-17 17-43 28-67 28-23 0-49-11-66-29L500 633 171 962c-17 17-43 28-67 28-23 0-49-11-66-29a92 92 0 0 1 0-132l329-329L38 171a92 92 0 0 1 0-133c38-38 95-38 133 0l329 329L829 38c38-38 95-38 133 0 37 37 37 95 0 133L633 500z" />
          </S.Obstruction>
        )}
      </S.Root>
    ),
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
