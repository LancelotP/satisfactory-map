import React, { useContext, useMemo } from "react";
import * as L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Node, NodePurity, NodeType } from "../../data/markers";
import { NodeMarker, getIconColors } from "../NodeMarker/NodeMarker";
import { SelectionContext } from "../../InteractiveMap";

type Props = {
  markers: Node[];
};

export const NodeGroup = (props: Props) => {
  const { selection } = useContext(SelectionContext);

  const markers = useMemo(() => {
    return props.markers.filter(m => {
      if (m.obstructed && selection.n_blocked) return false;
      // if (m.exploited && selection.n_exploited) return false;
      if (m.purity === "impure" && !selection.q_impure) return false;
      if (m.purity === "normal" && !selection.q_normal) return false;
      if (m.purity === "pure" && !selection.q_pure) return false;

      return true;
    });
  }, [
    selection.q_impure,
    selection.q_normal,
    selection.q_pure,
    selection.n_exploited,
    selection.n_blocked
  ]);

  // @ts-ignore
  if (!selection[`n_${props.markers[0].type}`]) {
    return null;
  }

  return (
    <MarkerClusterGroup
      removeOutsideVisibleBounds={true}
      animate={true}
      disableClusteringAtZoom={7}
      maxClusterRadius={0}
      // iconCreateFunction={createClusterIcon(markers[0].type)}
      chunkedLoading={true}
    >
      {markers.map(marker => (
        <NodeMarker key={marker.originId} marker={marker} />
      ))}
    </MarkerClusterGroup>
  );
};

// @ts-ignore
function createClusterIcon(type: NodeType) {
  return (cluster: L.MarkerCluster) => {
    const children = cluster.getAllChildMarkers();

    let impure = 0;
    let normal = 0;
    let pure = 0;

    children.forEach(child => {
      // @ts-ignore
      const purity = child.options.purity as NodePurity;

      switch (purity) {
        case "impure":
          impure++;
          break;
        case "normal":
          normal++;
          break;
        case "pure":
          pure++;
          break;
      }
    });

    let icon: string = "";

    if (impure && normal && pure)
      icon = ImpureNormalPureSvg(type, { impure, normal, pure });
    else if (impure && normal) icon = ImpureNormalSvg(type, { impure, normal });
    else if (impure && pure) icon = ImpurePureSvg(type, { impure, pure });
    else if (normal && pure) icon = NormalPureSvg(type, { normal, pure });
    else if (impure) icon = ImpureSvg(type, { impure });
    else if (normal) icon = NormalSvg(type, { normal });
    else if (pure) icon = PureSvg(type, { pure });

    return L.divIcon({
      iconSize: [144, 85],
      iconAnchor: [144 / 2, 85],
      html: icon,
      className: `node_cluster`
    });
  };
}

const ImpureSvg = (type: NodeType, count: { impure: number }) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `<svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill="${main}" d="M88.3 48.1L77 54.6l-11.4-6.5L77 41.5z"/>
    <path fill="${dark}" d="M88.3 48.1v3.2L77 57.9v-3.3z"/>
    <path fill="${mid}" d="M77 54.6v3.3l-11.4-6.6v-3.2z"/>
    <path d="M95 85.6v-20H78v-5.7l12.6-7.3v-5.8L77 39l-13.6 7.8v5.8L76 59.9v5.7H59v20h16.9v5.7c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-5.7H95zM64.5 52v-4.6L77 40.2l12.4 7.2v4.5l-12.5 7.2L64.5 52z" fill="${outline}"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(59 39)">
      <tspan x="8.4" y="42.6">${count.impure}</tspan>
    </text>
  </g>
</svg>`;
};

const NormalSvg = (type: NodeType, count: { normal: number }) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `<svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill="${dark}" d="M83.5 47.4v3.2l-11.4 6.6v-3.3z"/>
    <path fill="${main}" d="M72.1 53.9v3.3l-11.4-6.6v-3.2zM72.1 50.6V24.3L60.7 44.1z"/>
    <path fill="${dark}" d="M72.1 24.3l11.4 19.8-11.4 6.5z"/>
    <path fill="${mid}" d="M72.1 50.6l-8.5-4.9-2.9 1.7 11.4 6.5 11.4-6.5-2.8-1.7z"/>
    <path d="M90.1 84.9v-20h-17v-5.7l12.6-7.3v-5.8l-.7-.4 1.5-.8L72.1 20 57.7 44.9l1.5.8-.7.4v5.8L71 59.1v5.7H54v20h17v5.7c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-5.7h17.1v.1zM59.6 51.3v-4.5l.1-.1 1.6-.9-1.5-1-.5-.3 12.8-22.4L85 44.4l-.5.4-1.6.9 1.6.9.1.1v4.5l-12.5 7.2-12.5-7.1z" fill="${outline}"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(54 20)">
      <tspan x="8.6" y="60.9">${count.normal}</tspan>
    </text>
  </g>
</svg>`;
};

const PureSvg = (type: NodeType, count: { pure: number }) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `
  <svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill="${main}" d="M83.5 24.3l-4.3 9.9-2-4.5z"/>
    <path fill="${dark}" d="M66.8 29.7l-1.9 4.5-4.3-9.9z"/>
    <path fill="${mid}" d="M83.5 47.4L72 54l-11.4-6.6 2.8-1.6 8.6 4.9 8.6-4.9z"/>
    <path fill="${dark}" d="M83.5 47.4v3.3L72 57.4v-3.3z"/>
    <path fill="${main}" d="M72 54.1v3.3l-11.4-6.7v-3.3z"/>
    <path fill="${dark}" d="M89.2 34.2l-5.7 9.9-2.9 1.7-8.6 4.9 6.5-6.2 1.6-1.5.5-.5.5-.5 1-1 1.4-1.3zM63.6 37.2L61.9 41l-1.3-1.3-5.8-5.5 5.8 2zM83.5 24.3v11.9l-3 1-3.1 1.1-.5.2-2 .7-2.9 1V17.6l5.2 12.1 2 4.5z"/>
    <path fill="${main}" d="M89.2 34.2l-5.7 5.5-1.4 1.3-1 1-.5.5-.5.5-1.6 1.5-6.5 6.2-8.6-4.9-2.8-1.7-5.8-9.9 5.8 5.5 1.3 1.3 1.7-3.8-3-1V24.3l4.3 9.9 1.9-4.5L72 17.6v22.6l2.9-1 2-.7.5-.2 3.1-1.1 3-1z"/>
    <path d="M73 59.1l12.6-7.3V46l-.7-.4.7-.4v-.7L94 30l-8.3 2.9V19.3l-7.6 6.6-6-13.9-6 13.9-7.7-6.6v13.6L50 30l8.3 14.4v.6l.7.5-.7.4v5.8L70.9 59v5.9h-17v20h17v5.7c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-5.7h17v-20h-17v-5.8h.1zm-13.5-7.9v-4.6l.2-.1 1.5-.8-1.3-1-.3-.2v-.3l-.3-.3L52.4 32l5.6 1.9 1.5.5V21.7l5.8 5 1.1 1 .6-1.4 5-11.6 5 11.6.6 1.4 1.1-1 5.8-5v12.8l1.4-.5 5.6-1.9-6.9 12-.1.2v.3l-.1.1-1.6.9 1.6 1 .1.1v4.6l-12.6 7.2-12.4-7.3z" fill="${outline}"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(50 12)">
      <tspan x="12.4" y="69">${count.pure}</tspan>
    </text>
  </g>
</svg>
  `;
};

const ImpureNormalSvg = (
  type: NodeType,
  count: { impure: number; normal: number }
) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `<svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M116 52.9H99v-5.7l12.6-7.3v-5.8l-.7-.4 1.5-.9L98 8 83.6 32.9l1.5.9-.7.4V40L97 47.2v5.7H80v20h17v7.5H46.9v-7.5H64v-20H46.9v-5.7l12.6-7.3v-5.8l-13.6-7.8-13.5 7.8v5.8L45 47.2v5.7H28v20h16.9v9.5H71v8.3c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-8.3h26v-9.5h17v-20zM85.5 39.3v-4.5l.1-.1 1.6-.9-1.6-.9-.5-.3L98 10.1l12.9 22.3-.5.3-1.6.9 1.6.9.1.1v4.7L98 46.5l-12.5-7.2zm-52.1 0v-4.5l12.5-7.2 12.5 7.2v4.5l-12.5 7.2-12.5-7.2z" fill="${outline}"/>
    <path fill="${dark}" d="M109.4 35.4v3.2L98 45.2v-3.3z"/>
    <path fill="${main}" d="M98 41.9v3.3l-11.4-6.6v-3.2zM98 38.6V12.3L86.6 32.1z"/>
    <path fill="${dark}" d="M98 12.3l11.4 19.8L98 38.6z"/>
    <path fill="${mid}" d="M98 38.6l-8.6-4.9-2.8 1.7L98 41.9l11.4-6.5-2.8-1.7z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(28 8)">
      <tspan x="60.4" y="61.5">${count.impure}</tspan>
    </text>
    <path fill="${main}" d="M57.3 35.4l-11.4 6.5-11.4-6.5 11.4-6.6z"/>
    <path fill="${dark}" d="M57.3 35.4v3.2l-11.4 6.6v-3.3z"/>
    <path fill="${mid}" d="M45.9 41.9v3.3l-11.4-6.6v-3.2z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(28 8)">
      <tspan x="8.4" y="61.5">${count.normal}</tspan>
    </text>
  </g>
</svg>`;
};

const ImpurePureSvg = (
  type: NodeType,
  count: { impure: number; pure: number }
) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `
  <svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path d="M97 47.2l12.7-7.3v-5.8l-.7-.4.7-.4v-.7l8.3-14.5-8.4 2.9V7.4L102 14 96 0l-6 13.9-7.6-6.6v13.6L74 18.1l8.3 14.4v.6l.7.5-.7.4v5.8L95 47.2V53H78v20h17v7.5H44.9V73H62V53H44.9v-5.7L57.5 40v-5.8l-13.6-7.8-13.5 7.8V40L43 47.3V53H26v20h16.9v9.5H69v8.3c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-8.3h26V73h17V53H97v-5.8zm-13.6-7.9v-4.6l.2-.1 1.5-.8-1.3-1-.3-.2v-.3l-.1-.2-6.9-11.9 5.6 1.9 1.5.5V9.8l5.8 5 1.1 1 .6-1.4 5-11.6 5 11.6.6 1.4 1.1-1 5.8-5v12.8l1.4-.5 5.6-1.9-6.9 12-.1.1v.3l-.1.1-1.6.9 1.6 1 .1.1v4.6L96 46.5l-12.6-7.2zm-52 0v-4.5l12.5-7.2 12.5 7.2v4.5l-12.5 7.2-12.5-7.2z" fill="${outline}"/>
      <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(26)">
        <tspan x="60.4" y="69">${count.impure}</tspan>
      </text>
      <path fill="${main}" d="M55.3 35.4L43.9 42l-11.4-6.6 11.4-6.5z"/>
      <path fill="${dark}" d="M55.3 35.4v3.3l-11.4 6.6V42z"/>
      <path fill="${mid}" d="M43.9 42v3.3l-11.4-6.6v-3.3z"/>
      <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(26)">
        <tspan x="8.4" y="69">${count.pure}</tspan>
      </text>
      <path fill="${main}" d="M107.5 12.3l-4.3 9.9-2-4.5z"/>
      <path fill="${dark}" d="M90.8 17.7l-2 4.5-4.3-9.9z"/>
      <path fill="${mid}" d="M107.5 35.5L96 42.1l-11.5-6.6 2.9-1.7 8.6 5 8.6-5z"/>
      <path fill="${dark}" d="M107.5 35.5v3.3L96 45.4v-3.3z"/>
      <path fill="${main}" d="M96 42.1v3.3l-11.5-6.6v-3.3z"/>
      <path fill="${dark}" d="M113.2 22.2l-5.7 10-2.9 1.6-8.6 5 6.4-6.2 1.7-1.6.5-.5.4-.4 1.1-1 1.4-1.3zM87.5 25.3l-1.6 3.8-1.4-1.3-5.7-5.6 5.7 2zM107.5 12.3v11.9l-3 1.1-3.1 1-.5.2-2 .7-2.9 1V5.7l5.2 12 2 4.5z"/>
      <path fill="${main}" d="M113.2 22.2l-5.7 5.6-1.4 1.3-1.1 1-.4.4-.5.5-1.7 1.6-6.4 6.2-8.6-5-2.9-1.6-5.7-10 5.7 5.6 1.4 1.3 1.6-3.8-3-1.1V12.3l4.3 9.9 2-4.5 5.2-12v22.5l2.9-1 2-.7.5-.2 3.1-1 3-1.1z"/>
    </g>
  </svg>
  `;
};

const NormalPureSvg = (
  type: NodeType,
  count: { normal: number; pure: number }
) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `<svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M97 48.1l12.6-7.3V35l-.6-.4.7-.4v-.7L118 19l-8.3 2.9V8.3l-7.7 6.6L96 1l-6 13.9-7.6-6.6v13.6L74 19l8.3 14.4v.6l.7.5-.7.4v5.8L95 48.1V54H78v20h17v7.5H45V74h17V54H45v-5.7L57.6 41v-5.8l-.7-.4 1.5-.9L44 9.1 29.6 34l1.5.9-.7.4v5.8L43 48.3V54H26v20h17v9.5h26v7.3c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-7.3h26V74h17V54H97v-5.9zm-13.6-7.9v-4.6l.2-.1 1.5-.8-1.3-1-.3-.2v-.3l-.2-.3L76.4 21l5.6 1.9 1.5.5V10.7l5.8 5 1.1 1 .6-1.4 5-11.6 5 11.6.6 1.4 1.1-1 5.8-5v12.8l1.4-.5 5.6-1.9-6.9 12-.1.2v.3l-.1.1-1.6.9 1.6 1 .1.1v4.6L96 47.5l-12.6-7.3zm-51.9.2v-4.5l.1-.1 1.6-.9-1.6-1-.5-.3L44 11.2l12.9 22.3-.5.4-1.6.9 1.6.9.1.1v4.5L44 47.6l-12.5-7.2z" fill="${outline}"/>
    <path fill="${main}" d="M107.5 13.3l-4.3 9.9-2-4.5z"/>
    <path fill="${dark}" d="M90.8 18.7l-2 4.5-4.3-9.9z"/>
    <path fill="${mid}" d="M107.5 36.4L96 43l-11.5-6.6 2.9-1.6 8.6 4.9 8.6-4.9z"/>
    <path fill="${dark}" d="M107.5 36.4v3.3L96 46.4v-3.3z"/>
    <path fill="${main}" d="M96 43.1v3.3l-11.5-6.7v-3.3z"/>
    <path fill="${dark}" d="M113.2 23.2l-5.7 9.9-2.9 1.7-8.6 4.9 6.4-6.2 1.7-1.5.5-.5.4-.5 1.1-1 1.4-1.3zM87.5 26.2L85.9 30l-1.4-1.3-5.7-5.5 5.7 2zM107.5 13.3v11.9l-3 1-3.1 1.1-.5.2-2 .7-2.9 1V6.6l5.2 12.1 2 4.5z"/>
    <path fill="${main}" d="M113.2 23.2l-5.7 5.5-1.4 1.3-1.1 1-.4.5-.5.5-1.7 1.5-6.4 6.2-8.6-4.9-2.9-1.7-5.7-9.9 5.7 5.5 1.4 1.3 1.6-3.8-3-1V13.3l4.3 9.9 2-4.5L96 6.6v22.6l2.9-1 2-.7.5-.2 3.1-1.1 3-1z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(26 1)">
      <tspan x="60.4" y="69">${count.normal}</tspan>
    </text>
    <path fill="${dark}" d="M55.4 36.5v3.2L44 46.3V43z"/>
    <path fill="${main}" d="M44 43v3.3l-11.4-6.6v-3.2zM44 39.7V13.4L32.6 33.2z"/>
    <path fill="${dark}" d="M44 13.4l11.4 19.8L44 39.7z"/>
    <path fill="${mid}" d="M44 39.7l-8.6-4.9-2.8 1.7L44 43l11.4-6.5-2.8-1.7z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold" transform="translate(26 1)">
      <tspan x="8.4" y="69">${count.pure}</tspan>
    </text>
  </g>
</svg>`;
};

const ImpureNormalPureSvg = (
  type: NodeType,
  count: { impure: number; normal: number; pure: number }
) => {
  const { main, mid, dark, outline } = getIconColors(type);

  return `
  <svg viewBox="0 0 144 95" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path d="M123 47.1l12.6-7.3V34l-.7-.4.7-.4v-.7L144 18l-8.4 2.9V7.3l-7.6 6.6L122 0l-6 13.9-7.6-6.6v13.6L100 18l8.3 14.4v.6l.7.5-.7.4v5.8l12.6 7.3v5.9h-17v20h17v7.5H71v-7.5h17v-20H71v-5.7l12.6-7.3v-5.8l-.7-.4 1.5-.9L70 8.1 55.6 33l1.5.9-.7.4v5.8L69 47.3V53H52v20h17v7.5H18.9V73H36V53H18.9v-5.7L31.5 40v-5.8l-13.6-7.8-13.5 7.8V40L17 47.3V53H0v20h16.9v9.5H69v8.3c-.6.3-1 1-1 1.7a2 2 0 1 0 4 0 2 2 0 0 0-1-1.7v-8.3h52V73h17V53h-17v-5.9zm-13.6-7.9v-4.6l.2-.1 1.5-.8-1.3-1-.3-.2v-.3l-.1-.2-6.9-11.9 5.6 1.9 1.5.5V9.7l5.8 5 1.1 1 .6-1.4 5-11.6 5 11.6.6 1.4 1.1-1 5.8-5v12.8l1.4-.5 5.6-1.9-6.9 12-.1.2v.3l-.1.1-1.6.9 1.6 1 .1.1v4.6L122 46.5l-12.6-7.3zm-51.9.2v-4.5l.1-.1 1.6-.9-1.6-.9-.5-.3L70 10.2l12.9 22.3-.5.3-1.6.9 1.6.9.1.1v4.7L70 46.6l-12.5-7.2zm-52.1 0v-4.5l12.5-7.2 12.5 7.2v4.5l-12.5 7.2-12.5-7.2z" fill="${outline}"/>
    <path fill="${main}" d="M133.5 12.3l-4.3 9.9-2-4.5z"/>
    <path fill="${dark}" d="M116.8 17.7l-2 4.5-4.3-9.9z"/>
    <path fill="${mid}" d="M133.5 35.4L122 42l-11.5-6.6 2.9-1.6 8.6 4.9 8.6-4.9z"/>
    <path fill="${dark}" d="M133.5 35.4v3.3L122 45.4v-3.3z"/>
    <path fill="${main}" d="M122 42.1v3.3l-11.5-6.7v-3.3z"/>
    <path fill="${dark}" d="M139.2 22.2l-5.7 9.9-2.9 1.7-8.6 4.9 6.4-6.2 1.7-1.5.5-.5.4-.5 1.1-1 1.4-1.3zM113.5 25.2l-1.6 3.8-1.4-1.3-5.7-5.5 5.7 2zM133.5 12.3v11.9l-3 1-3.1 1.1-.5.2-2 .7-2.9 1V5.6l5.2 12.1 2 4.5z"/>
    <path fill="${main}" d="M139.2 22.2l-5.7 5.5-1.4 1.3-1.1 1-.4.5-.5.5-1.7 1.5-6.4 6.2-8.6-4.9-2.9-1.7-5.7-9.9 5.7 5.5 1.4 1.3 1.6-3.8-3-1V12.3l4.3 9.9 2-4.5L122 5.6v22.6l2.9-1 2-.7.5-.2 3.1-1.1 3-1z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold">
      <tspan x="112.4" y="69">${count.impure}</tspan>
    </text>
    <path fill="${dark}" d="M81.4 35.5v3.2L70 45.3V42z"/>
    <path fill="${main}" d="M70 42v3.3l-11.4-6.6v-3.2zM70 38.7V12.4L58.6 32.2z"/>
    <path fill="${dark}" d="M70 12.4l11.4 19.8L70 38.7z"/>
    <path fill="${mid}" d="M70 38.7l-8.6-4.9-2.8 1.7L70 42l11.4-6.5-2.8-1.7z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold">
      <tspan x="60.4" y="69">${count.normal}</tspan>
    </text>
    <path fill="${main}" d="M29.3 35.5L17.9 42 6.5 35.5l11.4-6.6z"/>
    <path fill="${dark}" d="M29.3 35.5v3.2l-11.4 6.6V42z"/>
    <path fill="${mid}" d="M17.9 42v3.3L6.5 38.7v-3.2z"/>
    <text fill="${dark}" font-family="IBMPlexSans-Bold, IBM Plex Sans" font-size="16" font-weight="bold">
      <tspan x="8.3" y="69">${count.pure}</tspan>
    </text>
  </g>
</svg>
  `;
};
