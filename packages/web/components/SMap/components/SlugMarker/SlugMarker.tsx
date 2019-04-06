import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerSlugInlineFragment
} from "../../../../__generated__";
import { memo } from "react";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerSlugInlineFragment };
  iconSize: number;
};

const DEFAULT_MARKER_WIDTH = 40;
const DEFAULT_MARKER_HEIGHT = 40;

export const SlugMarker = memo<Props>(props => {
  const { marker, iconSize } = props;

  return (
    <Marker
      position={marker}
      icon={L.divIcon({
        iconSize: [
          iconSize * DEFAULT_MARKER_WIDTH,
          iconSize * DEFAULT_MARKER_HEIGHT
        ],
        className: `slug_${marker.target.slugType}`,
        iconAnchor: [
          iconSize * (DEFAULT_MARKER_WIDTH / 2),
          iconSize * (DEFAULT_MARKER_HEIGHT / 2)
        ],
        popupAnchor: [0, -((iconSize * DEFAULT_MARKER_HEIGHT) / 2)]
      })}
    >
      <Popup>
        <p>Slug #{marker.target.id}</p>
        <ul>
          <li>
            <b>Color:</b> {marker.target.slugType.toLowerCase()}
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
});
