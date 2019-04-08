import * as React from "react";
import * as L from "leaflet";
import { Popup, Marker } from "react-leaflet";
import { Artifact } from "../../data/markers";
import { IconSizeContext } from "../../InteractiveMap";

// @ts-ignore
import somerIcon from "./somer.png";
// @ts-ignore
import mercerIcon from "./mercer.png";

type Props = {
  marker: Artifact;
};

export const ArtifactMarker: React.FunctionComponent<Props> = props => {
  const { marker } = props;
  const { iconSize } = React.useContext(IconSizeContext);

  const icons = {
    somer: somerIcon,
    mercer: mercerIcon
  };

  return (
    <Marker
      position={[marker.y || 0, marker.x || 0]}
      icon={L.icon({
        iconUrl: icons[marker.type],
        iconSize: [40 * iconSize, 40 * iconSize]
      })}
    >
      <Popup>
        <p style={{ textAlign: "center" }}>
          <b>{marker.type === "somer" ? "Somersloop" : "Mercer Sphere"}</b>
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
