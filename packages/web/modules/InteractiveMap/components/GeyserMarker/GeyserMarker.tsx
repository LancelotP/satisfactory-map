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
  let width: number = 0;
  let height: number = 0;

  if (mode === "default") {
    html = geyserSvg();
    width = 35 * iconSize;
    height = 71 * iconSize;
  } else {
    html = cbNormalSvg("geyser");
    width = 52 * iconSize;
    height = 82 * iconSize;
  }

  return L.divIcon({
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, height / -2],
    html,
    className: `geyser_marker`
  });
}

const geyserSvg = () => {
  return `
  <svg viewBox="0 0 35 71" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero" fill="none">
      <path d="M24.2 35.7c-.8-1.9-3.5-3.2-6.6-3.2-3.2 0-5.8 1.3-6.6 3.2h-.3V37c0 2.5 3.1 4.5 7 4.5 3.7 0 6.8-2 6.8-4.5v-1.3h-.3z" fill="#333"/>
      <ellipse fill="#666" cx="17.6" cy="35.7" rx="6.9" ry="4.5"/>
      <ellipse fill="#999" cx="17.6" cy="35.7" rx="5.7" ry="3.7"/>
      <ellipse fill="#999" cx="17.6" cy="23.7" rx="5.7" ry="3.7"/>
      <path fill="#999" d="M11.9 23.7h11.3v12H11.9z"/>
      <path d="M23.2 23.7v12c0 2-2.5 3.7-5.6 3.7-1.3 0-2.5-.3-3.6-.8l2.3.2c3.5 0 6.4-1.9 6.4-4.2v-11h.5z" fill="#333"/>
      <circle fill="#666" cx="11.2" cy="10.4" r="4.3"/>
      <path d="M14.6 13l.1-1a5 5 0 0 0-5-5h-1a4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="9.1" cy="8.1" r="1"/>
      <circle fill="#999" cx="8.4" cy="10" r="1"/>
      <circle fill="#999" cx="9.9" cy="12.4" r="1.1"/>
      <circle fill="#666" cx="27.9" cy="25.6" r="4.3"/>
      <path d="M31.3 28.2l.1-1a5 5 0 0 0-6.1-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="25.7" cy="23.3" r="1"/>
      <circle fill="#999" cx="25.1" cy="25.2" r="1"/>
      <circle fill="#999" cx="26.6" cy="27.5" r="1.1"/>
      <circle fill="#666" cx="11.7" cy="19.2" r="4.3"/>
      <path d="M15 21.9l.1-1.1a5 5 0 0 0-6.1-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="9.5" cy="17" r="1"/>
      <circle fill="#999" cx="8.9" cy="18.8" r="1"/>
      <circle fill="#999" cx="10.3" cy="21.2" r="1.1"/>
      <circle fill="#666" cx="7" cy="15.4" r="4.3"/>
      <path d="M10.3 18l.1-1a5 5 0 0 0-6-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="4.8" cy="13.1" r="1"/>
      <circle fill="#999" cx="4.2" cy="14.9" r="1"/>
      <circle fill="#999" cx="5.6" cy="17.3" r="1.1"/>
      <circle fill="#666" cx="18.6" cy="7" r="4.3"/>
      <path d="M22 9.6l.1-1.1a5 5 0 0 0-6-4.9 4.3 4.3 0 0 1 6 6H22z" fill="#333"/>
      <circle fill="#999" cx="16.4" cy="4.7" r="1"/>
      <circle fill="#999" cx="15.8" cy="6.5" r="1"/>
      <circle fill="#999" cx="17.3" cy="8.9" r="1.1"/>
      <circle fill="#666" cx="19.9" cy="14.3" r="4.3"/>
      <path d="M23.3 17v-1.2a5 5 0 0 0-6-4.8 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="17.7" cy="12" r="1"/>
      <circle fill="#999" cx="17.1" cy="13.9" r="1"/>
      <circle fill="#999" cx="18.5" cy="16.2" r="1.1"/>
      <circle fill="#666" cx="27.5" cy="18" r="4.3"/>
      <path d="M30.9 20.6l.1-1a5 5 0 0 0-6-5 4.3 4.3 0 0 1 6.8 3.4c0 1-.3 1.8-.9 2.6z" fill="#333"/>
      <circle fill="#999" cx="25.3" cy="15.7" r="1"/>
      <circle fill="#999" cx="24.7" cy="17.6" r="1"/>
      <circle fill="#999" cx="26.1" cy="19.9" r="1.1"/>
      <circle fill="#666" cx="23.9" cy="13.1" r="4.3"/>
      <path d="M27.3 15.7l.1-1a5 5 0 0 0-6.1-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="21.7" cy="10.8" r="1"/>
      <circle fill="#999" cx="21.1" cy="12.7" r="1"/>
      <circle fill="#999" cx="22.5" cy="15" r="1.1"/>
      <circle fill="#666" cx="12.3" cy="12.5" r="4.3"/>
      <path d="M15.7 15l.1-1a5 5 0 0 0-6.1-4.9 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="10.1" cy="10.2" r="1"/>
      <circle fill="#999" cx="9.5" cy="12" r="1"/>
      <circle fill="#999" cx="10.9" cy="14.4" r="1.1"/>
      <circle fill="#666" cx="16.4" cy="15" r="4.3"/>
      <path d="M19.8 17.6l.2-1a5 5 0 0 0-6.1-5 4.3 4.3 0 0 1 6.8 3.4c0 1-.3 1.9-.9 2.6z" fill="#333"/>
      <circle fill="#999" cx="14.3" cy="12.7" r="1"/>
      <circle fill="#999" cx="13.7" cy="14.6" r="1"/>
      <circle fill="#999" cx="15.1" cy="17" r="1.1"/>
      <circle fill="#666" cx="17.4" cy="21.1" r="4.3"/>
      <path d="M20.8 23.7l.1-1a5 5 0 0 0-6-5 4.3 4.3 0 0 1 6.9 3.4c0 .9-.4 1.8-1 2.6z" fill="#333"/>
      <circle fill="#999" cx="15.3" cy="18.8" r="1"/>
      <circle fill="#999" cx="14.6" cy="20.6" r="1"/>
      <circle fill="#999" cx="16.1" cy="23" r="1.1"/>
      <circle fill="#666" cx="22.5" cy="19.6" r="4.3"/>
      <path d="M26 22.3v-1a5 5 0 0 0-6-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="20.4" cy="17.4" r="1"/>
      <circle fill="#999" cx="19.7" cy="19.2" r="1"/>
      <circle fill="#999" cx="21.2" cy="21.6" r="1.1"/>
      <circle fill="#666" cx="22.1" cy="24.6" r="4.3"/>
      <path d="M25.5 27.2v-1a5 5 0 0 0-6-5 4.3 4.3 0 0 1 6 6z" fill="#333"/>
      <circle fill="#999" cx="19.9" cy="22.3" r="1"/>
      <circle fill="#999" cx="19.3" cy="24.2" r="1"/>
      <circle fill="#999" cx="20.7" cy="26.5" r="1.1"/>
      <rect fill="#666" x="12.5" y="24.3" width="1.6" height="8.5" rx=".8"/>
      <circle fill="#666" cx="13.3" cy="34.3" r="1"/>
      <path d="M33.5 21.5l.2-.3.2-.4v-.2l.2-.4V20l.2-.4v-.3V18.7 18c0-2.6-1.3-5-3.6-6.2a6.9 6.9 0 0 0-5.2-5.5A7 7 0 0 0 18.6 0H17.4l-.3.2h-.4l-.2.1-.5.2h-.2l-1 .7h-.2l-.2.2-.2.2a7 7 0 0 0-1.7 2 7 7 0 0 0-1.3-.2H10.3l-.4.1h-.2l-.4.1H9l-.3.4h-.2l-1.1.6-.2.1-.2.2-.2.1A7 7 0 0 0 4.5 9h-.1l-.2.1-1.1.6H3l-.2.3-.3.1A6.9 6.9 0 0 0 0 15.4 7 7 0 0 0 5.3 22c.8 1.7 2.2 3 4 3.7V32A6 6 0 0 0 8 35.7V37c0 3.7 3.6 6.7 8.4 7.1V67a2 2 0 1 0 2 0V44.1c5-.3 8.7-3.3 8.7-7.1v-1.3c0-1.2-.4-2.4-1.1-3.4a7 7 0 0 0 7.3-2.3l.1-.1.1-.2.2-.2.2-.4.2-.3.2-.4v-.2l.2-.3v-.3l.1-.4V27l.1-.4v-.3-.6a7 7 0 0 0-1.2-4.2zm.3 4.1a3.7 3.7 0 0 1 0 1v.3a2.8 2.8 0 0 1-.2.5l-.1.3-.1.2-.2.3-.1.3-.2.3-.2.2-.1.1v.1a5.9 5.9 0 0 1-6.2 2l-3-.9 1.8 2.5c.6.8 1 1.8 1 2.8V37c0 3.4-3.8 6.1-8.6 6.1-4.7 0-8.5-2.7-8.5-6.1v-1.3c0-1 .4-2.1 1-3l.3-.2V25l-.8-.3a6 6 0 0 1-3.3-3l-.2-.5-.5-.1a5.9 5.9 0 0 1-2.4-10.3h.1l.2-.2 1.1-.6h.2l.5-.3.2-.5c.3-1.3 1-2.4 2-3.3l.3-.2.2-.2.9-.5H9l.4-.1h.1l.4-.2h2.3l.8.2.4-.7a6 6 0 0 1 1.4-1.7h.1l.2-.2h.1l1-.5v-.1l.4-.1.4-.3h1.6c3.1-.1 5.6 2.2 6 5.3v.7l.7.2 1.2.4c1.6.8 2.8 2.3 3.2 4.1v.5l.5.3c2 1 3.2 3 3.2 5.2v1.2l-.1.4-.1.2-.1.3v.1l-.3.4v.2l-.4.6.4.6c.7 1 1.1 2.2 1.1 3.5l-.1.1z" fill="#999"/>
      <g style="mix-blend-mode:color" fill="#31B8D4">
        <path d="M32.2 25.6c0-1.7-1-3.2-2.6-4 .5-.2 1-.6 1.3-1v-.2l.3-.2.2-.4.1-.3a4.2 4.2 0 0 0 .3-1.5 4.3 4.3 0 0 0-3.7-4.3v-.6a4.3 4.3 0 0 0-5-4.2l-.2.1-.6.2.2-.4.1-.3.1-.5.1-.2.1-.8a4.3 4.3 0 0 0-5-4.2h-.3L17 3l-.3.1-.4.3-.3.1H16a4.3 4.3 0 0 0-1.6 4.1 4.2 4.2 0 0 0-4.7-1.1l-.3.1-.4.2-.3.2C7.5 7.8 7 9 7 10.4v.7h-.8l-.2.1-.6.2-.2.1a3.7 3.7 0 0 0-.7.4l-.2.1A4.3 4.3 0 0 0 7 19.6h.5a4.3 4.3 0 0 0 4.5 4v9.6c-.8.6-1.2 1.6-1.3 2.6V37c0 2.5 3.1 4.5 7 4.5 3.8 0 6.8-2 6.8-4.5v-1.3c0-1-.4-2-1.2-2.6v-4.4c.4-.1.9-.3 1.3-.6a4.2 4.2 0 0 0 6.8 0l.2-.3.2-.5.1-.2a4.1 4.1 0 0 0 .3-1.5zM16.7 10.8h-.5a4 4 0 0 0-.2-.5l.7.5z"/>
        <path d="M33.5 21.5l.2-.3.2-.4v-.2l.2-.4V20l.2-.4v-.3V18.7 18c0-2.6-1.3-5-3.6-6.2a6.9 6.9 0 0 0-5.2-5.5A7 7 0 0 0 18.6 0H17.4l-.3.2h-.4l-.2.1-.5.2h-.2l-1 .7h-.2l-.2.2-.2.2a7 7 0 0 0-1.7 2 7 7 0 0 0-1.3-.2H10.3l-.4.1h-.2l-.4.1H9l-.3.4h-.2l-1.1.6-.2.1-.2.2-.2.1A7 7 0 0 0 4.5 9h-.1l-.2.1-1.1.6H3l-.2.3-.3.1A6.9 6.9 0 0 0 0 15.4 7 7 0 0 0 5.3 22c.8 1.7 2.2 3 4 3.7V32A6 6 0 0 0 8 35.7V37c0 3.7 3.6 6.7 8.4 7.1V67a2 2 0 1 0 2 0V44.1c5-.3 8.7-3.3 8.7-7.1v-1.3c0-1.2-.4-2.4-1.1-3.4a7 7 0 0 0 7.3-2.3l.1-.1.1-.2.2-.2.2-.4.2-.3.2-.4v-.2l.2-.3v-.3l.1-.4V27l.1-.4v-.3-.6a7 7 0 0 0-1.2-4.2zm.3 4.1a3.7 3.7 0 0 1 0 1v.3a2.8 2.8 0 0 1-.2.5l-.1.3-.1.2-.2.3-.1.3-.2.3-.2.2-.1.1v.1a5.9 5.9 0 0 1-6.2 2l-3-.9 1.8 2.5c.6.8 1 1.8 1 2.8V37c0 3.4-3.8 6.1-8.6 6.1-4.7 0-8.5-2.7-8.5-6.1v-1.3c0-1 .4-2.1 1-3l.3-.2V25l-.8-.3a6 6 0 0 1-3.3-3l-.2-.5-.5-.1a5.9 5.9 0 0 1-2.4-10.3h.1l.2-.2 1.1-.6h.2l.5-.3.2-.5c.3-1.3 1-2.4 2-3.3l.3-.2.2-.2.9-.5H9l.4-.1h.1l.4-.2h2.3l.8.2.4-.7a6 6 0 0 1 1.4-1.7h.1l.2-.2h.1l1-.5v-.1l.4-.1.4-.3h1.6c3.1-.1 5.6 2.2 6 5.3v.7l.7.2 1.2.4c1.6.8 2.8 2.3 3.2 4.1v.5l.5.3c2 1 3.2 3 3.2 5.2v1.2l-.1.4-.1.2-.1.3v.1l-.3.4v.2l-.4.6.4.6c.7 1 1.1 2.2 1.1 3.5l-.1.1z"/>
      </g>
    </g>
  </svg>
  `;
};
