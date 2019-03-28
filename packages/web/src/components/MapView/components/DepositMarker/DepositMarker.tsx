import React from "react";
import {
  DepositMarkerFragment,
  DepositQuality
} from "../../../../__generated__";
import { getDepositColor } from "../../../../utils/getDepositColor";
import { Marker, Popup } from "react-leaflet";
import { T } from "../../../T/T";
import * as L from "leaflet";
import { readableColor } from "polished";

type Props = { marker: DepositMarkerFragment };

export const DepositMarker = (props: Props) => {
  const { marker } = props;

  let icon: string = "";

  switch (marker.quality) {
    case DepositQuality.Impure:
      icon = getImpureIconHtml({
        bg: getDepositColor(marker.type),
        text: marker.type[0]
      });
      break;
    case DepositQuality.Normal:
      icon = getNormalIconHtml({
        bg: getDepositColor(marker.type),
        text: marker.type[0]
      });
      break;
    case DepositQuality.Pure:
      icon = getPureIconHtml({
        bg: getDepositColor(marker.type),
        text: marker.type[0]
      });
      break;
  }

  return (
    <Marker
      position={L.latLng(marker.lat, marker.lng)}
      key={marker.id}
      icon={
        new L.DivIcon({
          html: icon,
          iconSize: [30, 30]
        })
      }
    >
      <Popup>
        <T align="center" transform="lowercase">
          {marker.quality} {marker.type}
        </T>
        {marker.addedBy && (
          <T align="center">Added by {marker.addedBy.userName}</T>
        )}
      </Popup>
    </Marker>
  );
};

type IconOption = {
  bg: string;
  text?: string;
};

function getImpureIconHtml(options: IconOption) {
  return `
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M20 2.24L1.62 39h36.76L20 2.24z" fill=${
      options.bg
    } stroke="#FFF" stroke-width="2"/>
    <text font-family="'Roboto Mono', monospace" font-size="20" font-weight="bold" fill=${readableColor(
      options.bg
    )}>
      <tspan x="14" y="34">${options.text}</tspan>
    </text>
  </g>
</svg>
  `;
}

function getNormalIconHtml(options: IconOption) {
  return `
  <svg viewBox="0 0 38 40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M19 1.28L1.13 15.56 7.99 38.8h22.02l6.86-23.24L19 1.28z" fill=${
      options.bg
    } stroke="#FFF" stroke-width="2"/>
    <text font-family="'Roboto Mono', monospace" font-size="20" font-weight="bold" fill=${readableColor(
      options.bg
    )} transform="translate(-1)">
      <tspan x="14" y="29">${options.text}</tspan>
    </text>
  </g>
</svg>
  `;
}

function getPureIconHtml(options: IconOption) {
  return `
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M39 10.62l-19-9.5-19 9.5v18.76l19 9.5 19-9.5V10.62z" fill=${
      options.bg
    } stroke="#FFF" stroke-width="2"/>
    <text font-family="'Roboto Mono', monospace" font-size="20" font-weight="bold" fill=${readableColor(
      options.bg
    )}>
      <tspan x="14" y="27">${options.text}</tspan>
    </text>
  </g>
</svg>
  `;
}
