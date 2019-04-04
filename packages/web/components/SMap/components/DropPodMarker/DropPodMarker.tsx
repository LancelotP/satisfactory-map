import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerDropPodInlineFragment
} from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { renderToStaticMarkup } from "react-dom/server";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerDropPodInlineFragment };
  iconSize: number;
};

export const DropPodMarker = (props: Props) => {
  const { marker, iconSize } = props;
  const {
    colors: {
      markers: { dropPod }
    }
  } = useTheme();

  return (
    <Marker icon={generateIcon(dropPod, iconSize)} position={marker}>
      <Popup>
        <p>DropPod #{marker.target.id}</p>
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
    </Marker>
  );
};

const generateIcon = (color: string, iconSize?: number) =>
  L.divIcon({
    iconSize: [iconSize || 30, iconSize || 30],
    html: renderToStaticMarkup(
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="8"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    )
  });
