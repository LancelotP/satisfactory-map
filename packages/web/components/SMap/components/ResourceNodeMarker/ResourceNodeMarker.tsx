import { readableColor } from "polished";
import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerResourceNodeInlineFragment
} from "../../../../__generated__";
import { Popup } from "../Popup/Popup";

const DEFAULT_MARKER_WIDTH = 52;
const DEFAULT_MARKER_HEIGHT = 82;

type Props = {
  marker: MarkerFragment & { target: MarkerResourceNodeInlineFragment };
  iconSize: number;
};

export const ResourceNodeMarker = (props: Props) => {
  const { marker, iconSize } = props;

  return (
    <Marker
      icon={L.divIcon({
        iconSize: [
          iconSize * DEFAULT_MARKER_WIDTH,
          iconSize * DEFAULT_MARKER_HEIGHT
        ],
        className: `node_${marker.target.rnType} node_${
          marker.target.rnQuality
        }`,
        iconAnchor: [
          (iconSize * DEFAULT_MARKER_WIDTH) / 2,
          iconSize * DEFAULT_MARKER_HEIGHT
        ],
        popupAnchor: [0, -(iconSize * DEFAULT_MARKER_HEIGHT)]
      })}
      position={props.marker}
    >
      <Popup>
        {marker.obstructed && <p>OBSTRUCTED BY BOULDER</p>}
        <p>ResourceNode #{marker.target.id}</p>
        <ul>
          <li>
            <b>Type:</b> {marker.target.rnType.toLowerCase()}
          </li>
          <li>
            <b>Quality:</b> {marker.target.rnQuality.toLowerCase()}
          </li>
          <li>
            <b>X:</b> {marker.lng}
          </li>
          <li>
            <b>Y:</b> {marker.lat}
          </li>
          <li>
            <b>Z:</b> {marker.alt}
          </li>
        </ul>
      </Popup>
    </Marker>
  );
};
