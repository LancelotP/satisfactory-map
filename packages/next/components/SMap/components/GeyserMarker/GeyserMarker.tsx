import { CircleMarker } from "react-leaflet";
import {
  MarkerFragment,
  MarkerResourceNodeInlineFragment
} from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerResourceNodeInlineFragment };
  iconSize: number;
};

export const GeyserMarker = (props: Props) => {
  const { marker, iconSize } = props;
  const {
    colors: {
      markers: { geyser }
    }
  } = useTheme();

  return (
    <CircleMarker
      stroke={true}
      color={"#fff"}
      weight={2}
      fill={true}
      fillOpacity={1}
      fillColor={geyser}
      radius={iconSize / 2}
      center={marker}
    >
      <Popup>
        <p>Geyser #{marker.target.id}</p>
        <ul>
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
    </CircleMarker>
  );
};
