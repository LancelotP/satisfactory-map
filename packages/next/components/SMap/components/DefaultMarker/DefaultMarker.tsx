import { CircleMarker } from "react-leaflet";
import { MarkerFragment } from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment;
};

export const DefaultMarker = (props: Props) => {
  const { marker } = props;
  const {
    colors: {
      markers: { unknown }
    }
  } = useTheme();

  return (
    <CircleMarker
      stroke={true}
      color={"#fff"}
      weight={2}
      fill={true}
      fillOpacity={1}
      fillColor={unknown}
      radius={10}
      center={marker}
    >
      <Popup>
        <p>Unknown marker #{marker.id}</p>
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
