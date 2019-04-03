import { CircleMarker } from "react-leaflet";
import {
  MarkerFragment,
  MarkerSlugInlineFragment,
  SlugType
} from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { memo } from "react";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerSlugInlineFragment };
  iconSize: number;
};

export const SlugMarker = memo<Props>(props => {
  const { marker, iconSize } = props;
  const {
    colors: {
      markers: { slugs }
    }
  } = useTheme();

  let color;

  switch (marker.target.slugType) {
    case SlugType.Yellow:
      color = slugs.yellow;
      break;
    case SlugType.Purple:
      color = slugs.purple;
      break;
    default:
      color = slugs.green;
      break;
  }

  return (
    <CircleMarker
      stroke={true}
      color={"#fff"}
      weight={2}
      fill={true}
      fillOpacity={1}
      fillColor={color}
      radius={(iconSize - 5) / 2}
      center={marker}
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
    </CircleMarker>
  );
});
