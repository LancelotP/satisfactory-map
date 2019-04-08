import * as React from "react";
import { Marker, Popup } from "react-leaflet";
import { Slug, SlugType } from "../../data/markers";
import { IconStyleContext, IconSizeContext } from "../../InteractiveMap";

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
  const height = 40 * iconSize;

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

export function slugSvg(type: SlugType) {
  const colors = {
    green: "#0ad1d8",
    yellow: "#f9f900",
    purple: "#d100ed"
  };

  return `
  <svg viewBox="0 0 206.1 206.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M144.9 74.3a67.8 67.8 0 0 0-14-17l12.6-29.5a11 11 0 0 0 9.2-11c0-6.2-4.7-11.2-10.5-11.2s-10.5 5-10.5 11.1c0 2.4.6 4.6 1.8 6.4l-12.2 28.8-26-10.3c-.8-5.3-5.1-9.4-10.4-9.4-5.8 0-10.5 5-10.5 11.2 0 6.2 4.7 11.2 10.5 11.2 2.6 0 5-1 6.7-2.6l26.8 10.7c-.8 7.7-2.8 24.6-6.7 34-9 22-21.8 31-33 39-9.2 6.5-17.8 12.6-22.5 24-8.6 20.8 2.7 36 9.2 39.6a5.5 5.5 0 0 0 8.2-3.9l.3-1.8c.5-3.5 1-7 4.7-11.5 2.3-2.9 8.3-4.8 15.2-7 16-5.2 40.3-13 53.5-44.8a61.2 61.2 0 0 0-2.4-56z" stroke="#FFF" stroke-width="8" fill="${
      colors[type]
    }" fill-rule="nonzero"/>
  </svg>
  `;
}
