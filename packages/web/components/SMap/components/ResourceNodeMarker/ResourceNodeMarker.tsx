import { renderToStaticMarkup } from "react-dom/server";
import { readableColor } from "polished";
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
import * as S from "./ResourceNodeMarker.style";

import ironSvg from "../../../Icons/markers/iron.svg";
import copperSvg from "../../../Icons/markers/copper.svg";
import limestoneSvg from "../../../Icons/markers/limestone.svg";
import bauxiteSvg from "../../../Icons/markers/bauxite.svg";
import uraniumSvg from "../../../Icons/markers/uranium.svg";
import coalSvg from "../../../Icons/markers/coal.svg";
import oilSvg from "../../../Icons/markers/oil.svg";
import sulfurSvg from "../../../Icons/markers/sulfur.svg";
import quartzSvg from "../../../Icons/markers/quartz.svg";
import samSvg from "../../../Icons/markers/sam.svg";
import cateriumSvg from "../../../Icons/markers/caterium.svg";

type Props = {
  marker: MarkerFragment & { target: MarkerResourceNodeInlineFragment };
  iconSize: number;
};

export const ResourceNodeMarker = (props: Props) => {
  const { marker, iconSize } = props;
  const {
    colors: {
      markers: { resourceNodes }
    }
  } = useTheme();

  let color;

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

  return (
    <Marker
      icon={generateIcon(marker, color, iconSize)}
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

const generateIcon = (
  marker: Props["marker"],
  color: string,
  iconSize: number = 30
) => {
  let iconComponent: JSX.Element;
  let fontSize = iconSize / 2;
  let top = iconSize / 10;
  let iconUrl: string | undefined;

  if (marker.target.rnQuality === ResourceNodeQuality.Impure) {
    top += iconSize / 5;
  } else if (marker.target.rnQuality === ResourceNodeQuality.Pure) {
    top += iconSize / 20;
  }

  switch (marker.target.rnQuality) {
    case ResourceNodeQuality.Pure:
      iconComponent = <PureIcon color={color} />;
      break;
    case ResourceNodeQuality.Normal:
      iconComponent = <NormalIcon color={color} />;
      break;
    default:
      iconComponent = <ImpureIcon color={color} />;
      break;
  }

  switch (marker.target.rnType) {
    case ResourceNodeType.Iron:
      iconUrl = ironSvg;
      break;
    case ResourceNodeType.Copper:
      iconUrl = copperSvg;
      break;
    case ResourceNodeType.Limestone:
      iconUrl = limestoneSvg;
      break;
    case ResourceNodeType.Bauxite:
      iconUrl = bauxiteSvg;
      break;
    case ResourceNodeType.Uranium:
      iconUrl = uraniumSvg;
      break;
    case ResourceNodeType.Coal:
      iconUrl = coalSvg;
      break;
    case ResourceNodeType.Oil:
      iconUrl = oilSvg;
      break;
    case ResourceNodeType.Sulfur:
      iconUrl = sulfurSvg;
      break;
    case ResourceNodeType.Quartz:
      iconUrl = quartzSvg;
      break;
    case ResourceNodeType.Sam:
      iconUrl = samSvg;
      break;
    case ResourceNodeType.Caterium:
      iconUrl = cateriumSvg;
      break;
  }

  console.log(samSvg);

  return L.icon({
    iconSize: [42, 66],
    iconAnchor: [21, 64],
    popupAnchor: [0, -50],
    iconUrl: iconUrl!
    // html: renderToStaticMarkup(
    //   <S.Root style={{ width: iconSize, height: iconSize }}>
    //     {iconComponent}
    //     <S.Letter style={{ fontSize, top, color: readableColor(color) }}>
    //       {marker.target.rnType[0]}
    //     </S.Letter>
    //     {marker.obstructed && <ObstructedIcon />}
    //   </S.Root>
    // )
  });
};

type IconProps = { color: string };

const ImpureIcon = ({ color }: IconProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 2.24L1.62 39h36.76L20 2.24z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const NormalIcon = ({ color }: IconProps) => (
  <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.6 20L20 1.6 38.4 20 20 38.4z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const PureIcon = ({ color }: IconProps) => (
  <svg viewBox="0 0 38 37" version="1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
      fillRule="evenodd"
    />
  </svg>
);

const ObstructedIcon = () => (
  <S.Obstruction
    xmlns="http://www.w3.org/2000/svg"
    version="1"
    viewBox="0 0 1000 1000"
  >
    <path d="M633 500l329 329c37 37 37 95 0 133-17 17-43 28-67 28-23 0-49-11-66-29L500 633 171 962c-17 17-43 28-67 28-23 0-49-11-66-29a92 92 0 0 1 0-132l329-329L38 171a92 92 0 0 1 0-133c38-38 95-38 133 0l329 329L829 38c38-38 95-38 133 0 37 37 37 95 0 133L633 500z" />
  </S.Obstruction>
);
