import * as React from "react";
import { Marker, Popup } from "react-leaflet";
import { Geyser } from "../../data/markers";
import { IconStyleContext, IconSizeContext } from "../../InteractiveMap";
import { normalSvg, cbNormalSvg } from "../NodeMarker/NodeMarker";

type Props = {
  marker: Geyser;
};

export const GeyserMarker: React.FunctionComponent<Props> = props => {
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
          <b>Geyser</b>
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
  marker: Geyser;
  iconSize: number;
  mode: "default" | "colorblind";
}) {
  const { iconSize, mode } = options;

  let html: string = "";

  if (mode === "default") {
    html = normalSvg("geyser");
  } else {
    html = cbNormalSvg("geyser");
  }

  const width = 52 * iconSize;
  const height = 82 * iconSize;

  return L.divIcon({
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, height / -2],
    html,
    className: `geyser_marker`
  });
}
