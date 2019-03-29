import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  MarkerDepositFragment,
  MarkerDropPodFragment,
  MarkerSlugFragment,
  MarkerType
} from "../../__generated__";

import * as S from "./Marker.style";
import * as L from "leaflet";

type MarkerProps = {
  type: MarkerType;
  text?: string | number;
};

export const Marker = (props: MarkerProps) => {
  const { text } = props;

  return (
    <S.Root>
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="nonzero" fill="none">
          <circle fill="red" cx="20" cy="20" r="19" />
          <path
            d="M20 2a18 18 0 1 1 0 36 18 18 0 0 1 0-36zm0-2a20 20 0 1 0 0 40 20 20 0 0 0 0-40z"
            fill="#FFF"
          />
        </g>
      </svg>
      <S.Text>{text}</S.Text>
    </S.Root>
  );
};

export function createMarkerIcon(props: MarkerProps) {
  const icon = L.divIcon({
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    html: ReactDOMServer.renderToStaticMarkup(<Marker {...props} />)
  });

  return icon;
}

type CreateMarkerProps = {
  marker: MarkerDepositFragment | MarkerSlugFragment | MarkerDropPodFragment;
};

export function createMarker(props: CreateMarkerProps) {
  const marker = L.marker([props.marker.lat, props.marker.lng], {
    icon: createMarkerIcon({
      type: MarkerType.Deposit
    })
  });

  return marker;
}
