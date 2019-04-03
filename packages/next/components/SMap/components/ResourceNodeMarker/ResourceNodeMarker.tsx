import { renderToStaticMarkup } from "react-dom/server";
import { Marker } from "react-leaflet";
import * as L from "leaflet";
import {
  MarkerFragment,
  MarkerResourceNodeInlineFragment,
  ResourceNodeType,
  ResourceNodeQuality
} from "../../../../__generated__";
import { useTheme } from "../../../../themes/styled";
import { Popup } from "../Popup/Popup";

type Props = {
  marker: MarkerFragment & { target: MarkerResourceNodeInlineFragment };
};

export const ResourceNodeMarker = (props: Props) => {
  const { marker } = props;
  const {
    colors: {
      markers: { resourceNodes }
    }
  } = useTheme();

  let color;
  let icon: L.DivIcon;

  switch (marker.target.rnType) {
    case ResourceNodeType.Iron:
      color = resourceNodes.iron;
      break;
    case ResourceNodeType.Copper:
      color = resourceNodes.copper;
      break;
    case ResourceNodeType.Limestone:
      color = resourceNodes.limestone;
      break;
    case ResourceNodeType.Bauxite:
      color = resourceNodes.bauxite;
      break;
    case ResourceNodeType.Uranium:
      color = resourceNodes.uranium;
      break;
    case ResourceNodeType.Coal:
      color = resourceNodes.coal;
      break;
    case ResourceNodeType.Oil:
      color = resourceNodes.oil;
      break;
    case ResourceNodeType.Sulfur:
      color = resourceNodes.sulfur;
      break;
    case ResourceNodeType.Quartz:
      color = resourceNodes.quartz;
      break;
    case ResourceNodeType.Sam:
      color = resourceNodes.sam;
      break;
    case ResourceNodeType.Caterium:
      color = resourceNodes.caterium;
      break;
    default:
      color = "red";
  }

  switch (marker.target.rnQuality) {
    case ResourceNodeQuality.Pure:
      icon = generatePureIcon(color);
      break;
    case ResourceNodeQuality.Normal:
      icon = generateNormalIcon(color);
      break;
    default:
      icon = generateImpureIcon(color);
      break;
  }

  return (
    <Marker icon={icon} position={props.marker}>
      <Popup>
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

const generateImpureIcon = (color: string) =>
  L.divIcon({
    iconSize: [30, 30],
    html: renderToStaticMarkup(
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 2.24L1.62 39h36.76L20 2.24z"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    )
  });

const generateNormalIcon = (color: string) =>
  L.divIcon({
    iconSize: [30, 30],
    html: renderToStaticMarkup(
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.6 20L20 1.6 38.4 20 20 38.4z"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    )
  });

const generatePureIcon = (color: string) =>
  L.divIcon({
    iconSize: [30, 30],
    html: renderToStaticMarkup(
      <svg viewBox="0 0 38 37" version="1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
          fillRule="evenodd"
        />
      </svg>
    )
  });
