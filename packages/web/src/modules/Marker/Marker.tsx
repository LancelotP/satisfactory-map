import React from "react";
import ReactDOMServer from "react-dom/server";
import { MarkerFragment, ResourceNodeQuality } from "../../__generated__";

import * as S from "./Marker.style";
import * as L from "leaflet";
import { getDepositColor } from "../../utils/getDepositColor";
import { getSlugColor } from "../../utils/getSlugColor";

type MarkerIconProps = {
  marker: MarkerFragment;
  markerSize: number;
  coords?: L.LatLng;
};

export const MarkerIcon = (props: MarkerIconProps) => {
  const { marker, markerSize } = props;

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

  return (
    <S.Root style={{ width: markerSize, height: markerSize }}>
      {Content}
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
  );
};

export function createPopup(props: MarkerIconProps) {
  return ReactDOMServer.renderToStaticMarkup(
    <S.Popup>
      <ul>
        {props.marker.obstructed && (
          <li>
            <strong>Obstructed by boulder</strong>
          </li>
        )}
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
        <li>
          <b>marker_id</b>: {props.marker.id}
        </li>
        <li>
          <b>target_id</b>: {props.marker.target.id}
        </li>
      </ul>
    </S.Popup>
  );
}
