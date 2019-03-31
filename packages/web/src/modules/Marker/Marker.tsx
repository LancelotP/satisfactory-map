import React from "react";
import ReactDOMServer from "react-dom/server";
import { MarkerFragment, ResourceNodeQuality } from "../../__generated__";

import * as S from "./Marker.style";
import * as L from "leaflet";
import { getDepositColor } from "../../utils/getDepositColor";
import { getSlugColor } from "../../utils/getSlugColor";

type MarkerProps = {
  marker: MarkerFragment;
};

export const Marker = (props: MarkerProps) => {
  const { marker } = props;

  let color = "red";
  let quality = ResourceNodeQuality.Unknown;

  if (marker.target.__typename === "ResourceNode") {
    color = getDepositColor(marker.target.nodeType);
    quality = marker.target.nodeQuality;
  } else if (marker.target.__typename === "Slug") {
    color = getSlugColor(marker.target.slugType);
  }

  let Content = (
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

  if (marker.target.__typename === "DropPod") {
    Content = (
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="8"
          fill="deeppink"
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    );
  } else if (quality === ResourceNodeQuality.Normal) {
    Content = (
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
  } else if (quality === ResourceNodeQuality.Pure) {
    Content = (
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
  } else if (quality === ResourceNodeQuality.Impure) {
    Content = (
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
  }

  return <S.Root>{Content}</S.Root>;
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
  marker: MarkerFragment;
};

export function createMarker(props: CreateMarkerProps) {
  const pos = L.latLng(
    props.marker.position.y / 100,
    props.marker.position.x / 100,
    props.marker.position.z
  );

  let marker;

  if (props.marker.target.__typename === "Slug") {
    marker = L.circleMarker(pos, {
      radius: 10,
      stroke: true,
      color: "#fff",
      weight: 2,
      fill: true,
      fillOpacity: 1,
      fillColor: getSlugColor(props.marker.target.slugType)
    });
  } else {
    marker = L.marker(pos, {
      icon: createMarkerIcon(props)
    });
  }

  marker.bindPopup(createPopup(props));

  return marker;
}

export function createPopup(props: CreateMarkerProps) {
  return ReactDOMServer.renderToStaticMarkup(
    <S.Popup>
      <ul>
        {props.marker.target.__typename === "ResourceNode" && (
          <li>
            <b>Type</b>: {props.marker.target.nodeType}
          </li>
        )}
        {props.marker.target.__typename === "ResourceNode" && (
          <li>
            <b>Quality</b>: {props.marker.target.nodeQuality}
          </li>
        )}
        {props.marker.target.__typename === "Slug" && (
          <li>
            <b>Type</b>: Slug
          </li>
        )}
        {props.marker.target.__typename === "Slug" && (
          <li>
            <b>Quality</b>: {props.marker.target.slugType}
          </li>
        )}
        <li>
          <b>X</b>: {props.marker.position.x}
        </li>
        <li>
          <b>Y</b>: {props.marker.position.y}
        </li>
        <li>
          <b>Z</b>: {props.marker.position.z}
        </li>
      </ul>
    </S.Popup>
  );
}
