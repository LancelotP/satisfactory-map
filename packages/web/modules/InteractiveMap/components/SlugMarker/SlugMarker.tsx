import * as React from "react";
import { Marker, Popup } from "react-leaflet";
import { Slug, SlugType } from "../../data/markers";
import { IconStyleContext, IconSizeContext } from "../../InteractiveMap";
import { generateIconColors } from "../NodeMarker/NodeMarker";

type Props = {
  marker: Slug;
};

export const SlugMarker: React.FunctionComponent<Props> = props => {
  const { marker } = props;
  const { mode } = React.useContext(IconStyleContext);
  const { iconSize } = React.useContext(IconSizeContext);

  return (
    <Marker
      position={[marker.y, marker.x]}
      icon={createMarkerIcon({
        marker,
        mode,
        iconSize
      })}
    >
      <Popup>
        <p style={{ textAlign: "center" }}>
          <b>{marker.type} slug</b>
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          <li>X: {marker.x}</li>
          <li>Y: {marker.y}</li>
          <li>Z: {marker.z}</li>
        </ul>
        <p style={{ textAlign: "center" }}>
          <b>Informations</b>
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          <li>ID: {marker.originId}</li>
          <li>Obstructed: {marker.obstructed ? "true" : "false"}</li>
        </ul>
      </Popup>
    </Marker>
  );
};

function createMarkerIcon(options: {
  marker: Slug;
  iconSize: number;
  mode: "default" | "colorblind";
}) {
  // @ts-ignore
  const { marker, iconSize, mode } = options;

  const width = 40 * iconSize;
  const height = 63 * iconSize;

  return L.divIcon({
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, height / -2],
    html: slugSvg(marker.type),
    className: `slug_marker slug_${marker.type}${
      marker.obstructed ? " marker_obstructed" : ""
    }`
  });
}

const colors = {
  green: generateIconColors("#0ad1d8"),
  yellow: generateIconColors("#f9f900"),
  purple: generateIconColors("#d100ed")
};

export function slugSvg(type: SlugType) {
  const color = colors[type];

  return `
    <svg viewBox="0 0 40 63" xmlns="http://www.w3.org/2000/svg">
      <g fill-rule="nonzero" fill="none">
        <path d="M36.2 6.5c0-.1 0-.2-.2-.2-1.8.4-4 .6-5.4 1.7a11.8 11.8 0 0 0-3.1 4.3c-1 1.8-1.8 3.6-2.5 5.5a33.2 33.2 0 0 1-4 7.1l-.8 1.2a.7.7 0 0 0 .5 1c1.2-.2 2.2.4 3.2.5.9.2 1.8-.1 2.4-.8.8-.8 1.1-2 2-2.7 1-.8 2-1.5 3.2-2 .9-.4 1.7-1 2.4-1.7l.5-1.1c.1-.7.4-1.3.9-1.8.7-.6 1-1.6 1-2.5-.2-1.2-1.3-1.8-1-3 .3-.7.7-1.2 1.2-1.6.4-.3.7-.6.8-1 0-1.1-.4-2.1-1-3z" fill="${
          color.dark
        }"/>
        <path d="M36.3 4.5c-.2-.6-.7-1-1.3-1.3a7 7 0 0 0-3.1-.3c-.8 0-1.5.2-2.2.4-1.4 0-2.5 1-3.8 1.5-1.5.7-3.2 1-4.8 1.6-1.4.6-2.7 1.4-3.8 2.3-.6.5-1.1 1-1.5 1.6l-.4 1a.2.2 0 0 0-.2.1c-.3 1-.7 1.8-1.3 2.6-.2.5-.4 1-.7 1.3l-1 .9c-.4.6-.4 1.4 0 2a3.6 3.6 0 0 1 .6 2.3c2-.3 4.2-.5 5.6 1.2C19.6 23 21 25 20.6 27c1.1-.3 1.7-1.8 2.3-2.8.8-1.5 2.8-2 3.4-3.7 1-1.3 2.2-2.6 3.5-3.6a8 8 0 0 1 1.4-.9c.4-.1.8-.3 1-.6.4-.4.6-.8.7-1.3l.1-.2c0-.9.8-1.4 1-2 .2-.6.3-1.2.2-1.7-.1-.8-.5-1.6.3-2.2l.8-.8h.1a2 2 0 0 0 .9-2.7z" fill="${
          color.mid
        }"/>
        <path d="M13.8 14.8c0-.6.3-.8.6-1.2l.4-1a.2.2 0 0 0-.2-.2c-.5.2-2.1-.7-2.3.2-.2.8 1 1.6 1.5 2.2zM16 12.7l.5-1.9c.2-1 .7-1.7 1.5-2.3v-.3c-1-.2-1.6-1-2.6-1.4-.6-.2-.9.1-1 .7 0 1 .2 2.1.8 3l1 2.2H16zM19.2 13.1l1.6-3.2a21 21 0 0 1 2-3.4c.3-.6 1-1 1.6-1.1l2.1-.9.3-.1L23 2.7c-1 0-1.8.3-2.6 1-.7.6-1.2 1.6-1.4 2.5a12 12 0 0 0-.5 3.6c0 1.1.5 2.3.6 3.3z" fill="${
          color.main
        }"/>
        <path d="M21 15l2.8-1.7c.5-.4 1.5-.7 1.7-1.3l.1-1.3.1-1.5a63.3 63.3 0 0 0-.2-3.6 6.2 6.2 0 0 0-4.4 5.8L21 15zM33.3 6c-.8.6-2.2.8-2.5 2-.2 1 .2 2 1 2.7a.2.2 0 0 0 .2-.2c.6-.3 1-.9 1-1.5.3-1 .6-1.9.7-2.9a.2.2 0 0 0-.4-.1zM25 19c1.1-.3 2.2-.8 3.1-1.6.4-.3.7-.8.9-1.3.2-.7.2-1.5 0-2.3 0 0 0-.2-.2-.2-.8 0-1.5 0-2.3.3-.3.1-.3.3-.2.6.3 1.4 0 3-1 4.1l-.3.4zM18.4 21.7c-1.4-1.6-3.7-1.5-5.7-1.2l.2.4h.2c-.3.5-.8.5-1.3.4l-1.6-1L8.5 19l-1.7-1L5.2 17l-.9-.6c-.2-.2-.6-.3-1-.2-.4.1-.7.6-.6 1 .1.5.6.8 1 1l.8.6 1.8 1 1.6 1L9.6 22l.8.6h.1l.3.6c.1.7 0 1.4-.3 2-.4.6-.9 1.1-1.4 1.5-.7.6-.5 1.4.5 1.3.7 0 1.4-.2 2.1-.4l2.2-.8c1.1-.3.8 1.6.8 2.3 0 .7 0 1.5.3 2.3a.2.2 0 0 0 .4 0c.6-1 .8-2 .8-3.2l.4.8.1.5.3 1.4.2 1.3.1.9.2.2.2.3c.4.1.7 0 1-.3a1 1 0 0 0 0-.8c0-1-.2-2.1-.6-3.1-.1-.6-.4-1.3.4-1.5.2-.1.5 0 .7-.3.1-.1.2-.3.1-.5H20.5c.3-2-1-4-2.1-5.4z" fill="${
          color.main
        }"/>
        <path d="M38.3 12.4c1-.6 1.5-1.6 1.7-2.7.1-1.4-.2-2.7-.9-3.8.1-.8 0-1.5-.2-2.3a4.9 4.9 0 0 0-2.7-3 7 7 0 0 0-3-.5A9 9 0 0 0 32 0h-.2c-1 0-1.8.2-2.7.5-.8 0-1.6.3-2.3.7C24.4 0 23.8 0 23.5 0h-.7a6.5 6.5 0 0 0-6 4.5l-.4-.2A3.4 3.4 0 0 0 11.6 7a6 6 0 0 0 .2 2.6c-1.1.3-2 1.3-2.2 2.4-.2.9 0 1.8.4 2.6-.4.5-.7 1.1-.8 1.7l-3.4-2.2a4 4 0 0 0-2.2-.7l-1 .1c-1.8.6-3 2.4-2.5 4.3a4 4 0 0 0 2 2.6h.2l5.6 3.7-.3.3-.3.2a3.6 3.6 0 0 0-1.2 4 3.5 3.5 0 0 0 3.4 2.1h.2c.8 0 1.6-.1 2.3-.3 0 .6.2 1.2.4 1.8a3 3 0 0 0 2.4 2l.5.8c.3.4.7.8 1.2 1l1.5.3c1.2 0 2.3-.6 3-1.6.3-.6.5-1.4.4-2.2 0-1 0-1.9-.3-2.8l.7.3 1.2.3V59a2 2 0 1 0 2 0V30.4c1.2-.2 2.3-.8 3.2-1.7.5-.5 1-1 1.3-1.7l.6-.9a11.1 11.1 0 0 1 2.7-1.6l.4-.3c1.1-.5 2-1.2 2.8-2.1.5-.7.9-1.5 1-2.3 0 0 0-.2.4-.6a6 6 0 0 0 1.6-4.7c-.1-.7-.4-1.4-.8-2h.1zm-.7-.8h-.2l-.6.7.4.7c.4.5.6 1 .7 1.7a5 5 0 0 1-1.3 3.8c-.3.3-.5.6-.6 1-.2.7-.4 1.3-.8 1.8-.7.8-1.5 1.4-2.5 1.9l-.4.2-.6.3c-.8.4-1.6 1-2.3 1.5l-.8 1.1c-.3.6-.7 1.2-1.2 1.7-.8.9-2 1.4-3.1 1.4h-.6l-1.5-.4-1-.2-1.6-.3.5 1.6.3 2.4v.2A2.3 2.3 0 0 1 17 35c-.3-.1-.6-.3-.8-.6l-.3-.5-.3-.6-.6-.2c-.7 0-1.3-.5-1.5-1.2l-.4-1.6L13 29l-1.2.3-2.1.3h-.2c-1 .1-2-.5-2.3-1.4-.4-1 0-2.1.8-2.8l.2-.1.4-.3 1-1-1.2-.8-5.5-3.7h-.2a3 3 0 0 1-1.5-2 2.5 2.5 0 0 1 2.4-3 3 3 0 0 1 1.6.5l3.4 2.3 1.4.8.3-1.6c0-.4.3-.9.5-1.2l.5-.6-.4-.6c-.3-.6-.4-1.3-.2-1.9a2 2 0 0 1 1.4-1.5l1-.3-.3-1c-.1-.7-.2-1.5 0-2.2a2.3 2.3 0 0 1 3.2-2l.3.3 1.1.5.5-1.2c.3-1 .8-1.8 1.6-2.4A5.5 5.5 0 0 1 23.4 1c1 .2 2 .6 2.9 1.2l.5.2.4-.2c.7-.3 1.3-.5 2-.6h.2c.8-.3 1.6-.4 2.4-.4H33.2c.9-.1 1.7 0 2.5.4 1 .4 1.8 1.3 2.1 2.3.2.6.3 1.2.2 1.8V6l.2.3c.5 1 .8 2 .7 3.1a3 3 0 0 1-1.3 2z" fill="${
          color.main
        }"/>
      </g>
    </svg>
  `;
}
