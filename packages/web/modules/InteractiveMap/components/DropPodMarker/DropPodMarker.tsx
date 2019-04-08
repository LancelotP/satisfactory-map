import * as React from "react";
import { Marker, Popup } from "react-leaflet";
import { DropPod } from "../../data/markers";
import { IconStyleContext, IconSizeContext } from "../../InteractiveMap";

type Props = {
  marker: DropPod;
};

export const DropPodMarker: React.FunctionComponent<Props> = props => {
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
          <b>DropPod {marker.originId}</b>
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          <li>X: {marker.x}</li>
          <li>Y: {marker.y}</li>
          <li>Z: {marker.z}</li>
        </ul>
        <p style={{ textAlign: "center" }}>
          <b>Requirements</b>
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
          <li>Power: {marker.powerNeeded || "none"}</li>
          <li>
            Item: {marker.itemQuantity} {marker.itemName || "none"}
          </li>
        </ul>
      </Popup>
    </Marker>
  );
};

function createMarkerIcon(options: {
  marker: DropPod;
  iconSize: number;
  mode: "default" | "colorblind";
}) {
  const { iconSize } = options;

  const width = 39 * iconSize;
  const height = 73 * iconSize;

  return L.divIcon({
    iconSize: [width, height],
    iconAnchor: [width / 2, height],
    popupAnchor: [0, height / -2],
    html: dropPodSvg(),
    className: `drop_pod_marker`
  });
}

export function dropPodSvg() {
  return `
  <svg viewBox="0 0 39 73" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="nonzero" fill="none">
      <path fill="#4E687C" d="M20.3 43.3L4 34V12.8l16.2 9.4z" />
      <path fill="#EDEDED" d="M6.4 32.4V16.6L18 23.2V39z" />
      <path
        d="M17.4 23.6V38L7 32V17.6l10.4 6zm.6-.4L6.4 16.6v15.8L18 39V23.2z"
        fill="#EDEDED"
      />
      <path fill="#8A9CA8" d="M6.4 32.4V16.6L18 23.2V39z" />
      <path
        d="M17.4 23.6V38L7 32V17.6l10.4 6zm.6-.4L6.4 16.6v15.8L18 39V23.2z"
        fill="#43323A"
      />
      <path
        fill="#43323A"
        d="M6.8 30.9l-.7-.4v-2.4l.7.4zM6.8 20.8l-.7-.4v-2.3l.7.3z"
      />
      <path
        fill="#3C3C3B"
        d="M6.8 30.9l-.7-.4v-2.4l.7.4zM6.8 20.8l-.7-.4v-2.3l.7.3z"
      />
      <path
        fill="#FFF"
        d="M10.9 32l-.8-.4v-1.5l.8.4zM12 32.7l-.8-.4v-1.5l.8.4zM13.2 33.4l-.8-.5v-1.5l.8.5zM14.3 34l-.8-.4v-1.5l.8.4z"
      />
      <path fill="#374A57" d="M34.3 14l-14 8.2v21.1l14-8z" />
      <path fill="#97AAB8" d="M34.3 14l-14 8.2L4 12.8l14-8z" />
      <path fill="#43323A" d="M10 27l4.4 4 1.2-.7v-5.4l-5.7-3.3-1.2.7z" />
      <path fill="#575756" d="M14.4 31l-5.7-3.3v-5.4l5.7 3.3z" />
      <path
        d="M9.3 23l1.2.7.2.2v.7l-.2.1-1.2-.7-.1-.2V23 23zM11 24l1.2.7.2.2v.7c0 .1 0 .2-.2.1L11 25l-.1-.2V24c0-.1 0-.2.1-.1zM12.6 25l1.2.6.2.3v.7h-.2l-1.2-.7-.1-.2V25s0-.1.1 0zM9.3 24.2l1.2.7.2.3v.7h-.2l-1.2-.7-.1-.2v-.7c0-.1 0-.1 0 0zM11 25.2l1.2.7.2.2v.7s0 .1-.2 0l-1.2-.6-.1-.3v-.7h.1zM12.6 26.1l1.2.7.2.3v.7h-.2l-1.2-.7-.1-.2v-.7s0-.1.1 0zM9.3 25.4l1.2.7.2.2v.7s-.1.1-.2 0l-1.2-.6-.1-.3v-.7zM11 26.4l1.2.7.2.2v.7s0 .1-.2 0l-1.2-.6-.1-.3v-.7h.1zM12.6 27.3l1.2.7.2.3v.7s0 .1-.2 0l-1.2-.6-.1-.3v-.7s0-.1.1 0zM9.3 26.6l1.2.7.2.2v.7c0 .1-.1.2-.2.1l-1.2-.7-.1-.2v-.7-.1z"
        fill="#FFF"
      />
      <path
        d="M11 27.6l1.2.7.2.2v.7s0 .1-.2 0l-1.2-.6-.1-.3v-.7h.1z"
        fill="#E05A5A"
      />
      <path
        d="M12.6 28.5l1.2.7.2.3v.6c0 .1 0 .2-.2.1l-1.2-.7-.1-.2v-.7c0-.1 0-.1.1 0z"
        fill="#9D9D9C"
      />
      <path
        d="M11 21a.2.2 0 0 1-.4.3.8.8 0 0 1-.3-.7c0-.2.1-.3.3-.2.2.1.4.4.4.7z"
        fill="#E05A5A"
      />
      <path
        d="M12.8 22.1a.2.2 0 0 1-.3.2.8.8 0 0 1-.4-.6c0-.3.2-.3.4-.2.2.1.3.4.3.6zM14.7 23c0 .3-.2.4-.4.3a.8.8 0 0 1-.4-.7c0-.2.2-.3.4-.2.2.2.4.4.4.7z"
        fill="#FAD786"
      />
      <path
        d="M22.3 46.9l16.1-9.3V11.7L18.1 0 0 10.5v25.9l18.2 10.5 1.2.6v21.2a2 2 0 0 0 1 3.7 2 2 0 0 0 1-3.8V47.5l1-.5zM2.1 35.2V11.6l16-9.2 18.2 10.5v23.5l-15 8.7-1 .5-1-.5L2 35z"
        fill="#DD8630"
      />
      <path
        fill="#DD8630"
        style="mix-blend-mode:color"
        d="M20.3 43.3l14-8V14L18 4.8l-14 8V34l16.2 9.3"
      />
    </g>
  </svg>
  `;
}
